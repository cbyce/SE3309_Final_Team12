-- CREATE DATABASE team12;
-- USE twam12;
CREATE TABLE Product(
	productID 		VARCHAR(8) NOT NULL PRIMARY KEY,
	productName		VARCHAR(50),
    productType		VARCHAR(25),
    productPrice 	DECIMAL(6,2),
	quantity		INT
);

CREATE TABLE Employee(
	eID				VARCHAR(8) NOT NULL PRIMARY KEY,
    eFName			VARCHAR(25),
    eLName			VARCHAR(25),
    hourlyPay		DECIMAL(6,2)
);

CREATE TABLE Customer(
	cID					varchar(8) NOT NULL PRIMARY KEY,
    cFName				varchar(25),
    cLName				varchar(25),	
	email				varchar(50),
    getsDiscount		boolean 
);


CREATE TABLE Shipment(
	shipmentID			varchar(8) NOT NULL PRIMARY KEY,
    shipmentDate		datetime,
    supplierName		varchar(50)
);

CREATE TABLE ProductShipment(
    shipmentID			varchar(8) NOT NULL,
    productID			varchar(8) NOT NULL,
    productQuantity		int,
    PRIMARY KEY (productID, shipmentID),
    FOREIGN KEY (productID) REFERENCES Product(productID),
    FOREIGN KEY (shipmentID) REFERENCES Shipment(shipmentID)
);

CREATE TABLE Purchase(
	orderID			varchar(8) NOT NULL,
    orderFillDate	datetime,
    cID				varchar(8),
    eID				varchar(8),
    PRIMARY KEY (orderID),
    FOREIGN KEY (cID) REFERENCES Customer(cID),
	FOREIGN KEY (eID) REFERENCES Employee(eID)
);


CREATE TABLE ProductPurchase(
	orderID			varchar(8) NOT NULL,
    productID		varchar(8) NOT NULL,
    qty				int,
    prodCost			decimal(6,2),
    PRIMARY KEY (orderID, productID),
    FOREIGN KEY (productID) references Product(productID)
);

CREATE TABLE Reservation(
	resTime	datetime NOT NULL,
    cID		varchar(8) NOT NULL,
    eID		varchar(8) NOT NULL,
    PRIMARY KEY (resTime, cID),
    FOREIGN KEY (cID) REFERENCES Customer(cID),
	FOREIGN KEY (eID) REFERENCES Employee(eID)
);

CREATE TABLE Advertisement(
	cID			varchar(8) NOT NULL,
	dateAdvert	datetime NOT NULL,
    productID	varchar(8),
    PRIMARY KEY (cID, dateAdvert),
    FOREIGN KEY (cID) REFERENCES Customer(cID),
    FOREIGN KEY (productID) REFERENCES Product(productID)
);


