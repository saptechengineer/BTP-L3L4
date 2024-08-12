using {ACG_PRJ1_CRUD.db as db} from '../db/data-model';


//service CatalogService @(requires: 'authenticated-user')
service CatalogService
{
    // entity Customers as
    //     projection on db.Customers;	

    @readonly entity GetCustomers as
        projection on db.Customers;

    @updateonly entity UpdateCustomers as
        projection on db.Customers;

    @insertonly entity InsertCustomers as
        projection on db.Customers;  

    @deleteonly entity DeleteCustomers as
        projection on db.Customers;              
}