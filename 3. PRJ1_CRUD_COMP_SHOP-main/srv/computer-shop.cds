using {ACG_PRJ1_CRUD.db as db} from '../db/data-model';


//service CatalogService @(requires: 'authenticated-user')
service ComputerShop
{

    // @readonly entity GetCustomers as
    //     projection on db.Customers;

    type PayloadItem : {
        // orderID : Integer; //Composition of Orders;
        itemID : Integer;
        itemName : String;
        itemPrice : Integer; //Decimal(5, 2);
        computer_comID : Integer;
    };
    

    type PayloadOrder : {
        ordID: Integer;
        orddate: Date;
        netPrice: Integer; //Decimal(5, 2);
        // customer: Integer;
        items: array of PayloadItem;
    };


    entity GetCustomers as select from db.Customers
    {
        *,
        concat(firstName, lastName) as fullName: String
    }excluding{
        firstName, lastName
    };

    entity GetComputers as
        projection on db.Computers;


    entity Orders as
        projection on db.Orders;

    entity OrderItems as
        projection on db.OrderItems;

   action  deepInsert(data : array of PayloadOrder)  returns String;              

}