#[starknet::interface]
trait ISimpleStore<TContractState> {
    fn get_metadata(self: @TContractState) -> (
        ByteArray,
        ByteArray,
        ByteArray,
        ByteArray
    );

    // #[payable]
    fn purchase(self: @TContractState, item_index: i32) -> ByteArray;
}

#[starknet::contract]
mod ZkPage {
    use super::ISimpleStore;


    #[derive(Debug, Clone)]
    struct PageItem {
        name: ByteArray,
        description: ByteArray,
        link: ByteArray,
        price: u128,
    }

    #[storage]
    struct Storage {
        page_name: ByteArray,
        description: ByteArray,
        owner: ByteArray,
        items: ByteArray
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        page_name: ByteArray,
        description: ByteArray,
        owner: ByteArray,
        items: ByteArray,
    ) {
        self.page_name.write(page_name);
        self.description.write(description);
        self.owner.write(owner);
        self.items.write(items);
    }

    #[abi(embed_v0)]
    impl ISimpleStoreImpl of super::ISimpleStore<ContractState> {
        fn get_metadata(self: @ContractState) -> (
            ByteArray,
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

        fn purchase(
            self: @ContractState,
            item_index: i32,
        ) -> ByteArray {
            // let sender = msg.sender();
            // let storage_items = self.items.clone();

            // // Ensure item_index is within valid range
            // assert(item_index >= 0 && (item_index as usize) < storage_items.len(), "Invalid item index");

            // let mut item = storage_items[item_index as usize].clone();

            // // Ensure sufficient payment
            // assert(msg.value() >= item.price as u128, "Insufficient payment");

            // Transfer payment to owner
            // let owner = self.owner.read();
            // starknet::transfer::stark_transfer(owner, msg.value());

            // Return the link of the purchased item
            // item.link.clone()
            "purchase successful"
        }
    }
}
