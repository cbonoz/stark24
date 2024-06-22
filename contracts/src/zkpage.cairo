#[starknet::interface]
trait ISimpleStore<TContractState> {
    fn get_metadata(self: @TContractState) -> (
        felt252,
        ByteArray,
        felt252,
        ByteArray
    );

    // #[payable]
    fn purchase(self: @TContractState, item_index: i32) -> ByteArray;
}

#[starknet::contract]
mod ZkPage {
    use super::ISimpleStore;
    use starknet::get_caller_address;
    use starknet::ContractAddress;


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
        owner: felt252,
        items: ByteArray
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        page_name: felt252,
        description: ByteArray,
        owner: felt252,
        items: ByteArray,
    ) {
        self.page_name.write(page_name);
        self.description.write(description);
        self.owner.write(owner);
        self.items.write(items);
    }

    #[event]
    fn ItemPurchased(from: ContractAddress, item_index: i32, value: u256) {}

    #[abi(embed_v0)]
    impl ISimpleStoreImpl of super::ISimpleStore<ContractState> {
        fn get_metadata(self: @ContractState) -> (
            felt252,
            ByteArray,
            felt252,
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
        fn purchase(
            self: @ContractState,
            item_index: i32,
        ) -> ByteArray {
            // emit event
            ItemPurchased(get_caller_address(), item_index, 0);
            "purchase event emitted"
        }
    }
}
