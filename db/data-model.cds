namespace ACG_PRJ1_CRUD.db;

// entity Computers
// {
//     key ID : Integer;
//     name : String;
// 	model : String;
// 	unitprice: Integer;
//     stock : Integer;
// };

entity Customers{
    key ID : Integer;
    key email : String(30);
    firstName : String(30);
    lastName : String(30);
    city : String(30);
}


entity Computers { 
    key comID : Integer;
        comName: String;
        model : String;
        unitPrice: Integer; //Decimal(5, 2);
        stock : Integer;
        availableFlag: Boolean;
        ordItems: Association to many OrderItems on ordItems.computer = $self;
}


entity Orders {

    key ordID: Integer;
        // customer: Association to Customers;
        orddate: Date;
        netPrice: Integer; //Decimal(5, 2);
        items: Composition of many OrderItems on items.orderID = $self;

}


entity OrderItems {
    key orderID : Association to Orders; //Composition of Orders;
    key itemID : Integer;
        itemName : String;
        itemPrice : Integer; //Decimal(5, 2);
        computer: Association to Computers;
}