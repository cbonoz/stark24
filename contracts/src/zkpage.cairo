use starknet::ContractAddress;

#[starknet::interface]
trait ISimpleStore<T> {
    fn get_metadata(self: @T) -> (
        felt252,
        ByteArray,
        ByteArray,
        ByteArray
    );

    fn purchase_item(ref self: T, item_index: i32) -> ByteArray;
}

#[starknet::contract]
mod ZkPage {
    use super::ISimpleStore;
    // Core Library Imports
    use starknet::{ContractAddress, get_caller_address, storage_access::StorageBaseAddress, ClassHash};
    use serde::Serde;
    use starknet::event::EventEmitter;
    use zeroable::Zeroable;
    use traits::Into;
    use traits::TryInto;
    use array::ArrayTrait;
    use option::OptionTrait;


    #[derive(Debug, Clone)]
    struct PageItem {
        name: felt252,
        description: ByteArray,
        link: felt252,
        price: u128,
    }

    #[storage]
    struct Storage {
        page_name: felt252,
        description: ByteArray,
        owner: ByteArray,
        items: ByteArray,
        purchase_map: LegacyMap::<(ContractAddress, i32), bool>,

    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        page_name: felt252,
        description: ByteArray,
        owner: ByteArray,
        items: ByteArray,
    ) {
        self.page_name.write(page_name);
        self.description.write(description);
        self.owner.write(owner);
        self.items.write(items);
    }

    #[event]
    fn ItemPurchased(from: ContractAddress, item_index: i32) {}

    #[event]
    fn PurchaseAttempt(from: ContractAddress, item_index: i32) {}

    #[abi(embed_v0)]
    impl ISimpleStoreImpl of super::ISimpleStore<ContractState> {
        fn get_metadata(self: @ContractState) -> (
            felt252,
            ByteArray,
            ByteArray,
            ByteArray
        ) {
            let page_name = self.page_name.read();
            let description = self.description.read();
            let owner = self.owner.read();
            let items = self.items.read();
            (page_name, description, owner, items)
        }

        // https://github.com/PhilippeR26/starknet.js-workshop-typescript/blob/789e912a1ac647e4eb87f3ad97f52b44b2851f99/contracts/cairo200/erc20.cairo
        // Send purchase event.
        fn purchase_item(
            ref self: ContractState,
            item_index: i32,
        ) -> ByteArray {
            let sender = get_caller_address();
            let purchased = self.purchase_map.read((sender, item_index));
            PurchaseAttempt(sender, item_index);
            if (purchased) {
                return "Item already purchased";
            }
            // emit event if new purchase
            self.purchase_map.write((sender, item_index), true);
            ItemPurchased(sender, item_index);
            "Item purchase event successful"
        }
    }
}
