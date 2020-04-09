0. post a challan with image
http://localhost:4000/api/ipfs/file
params:
ipfsfile ( fileupload)
platenum:8423
geoLat:17
geoLng:58
desc:Signal Jump
result:
{
    "iotaroot": "OGSMLZYAFIKRFOASPMQERKAHZKNSK9XH9NTOXHODEVETGIIKZO9NZZCWRTKRNSUUJIUOWLAUJ9EJSDOTY",
    "ipfshash": "QmRMXNHKsQx9uM8g87MTQ6JB9TFzMZtVEaLuriNYNpKPPb"
}

1. Get challans
http://localhost:4000/api/challans/[platenum]/[date]/[isappealed]/[ispaid]
http://localhost:4000/api/challans/8423
result:
[
    {
        "_id": "5d2322b68f49ff0e04c12717",
        "challanNum": "8423538",
        "platenum": "8423",
        "challanDate": "2019-07-08T11:02:11.538Z",
        "IOTA_Hash": "UPJ9LBQGXLUSXIMKYAFSNDEEQMXAPHLSJYUNJACDGBTHCQ9CMBSDUCJIVTGUW9KTADUOPTMADNFHQQFAR",
        "IOTA_Seed": "",
        "IOTA_Channel_Start": 1,
        "IPFS_Hash": "QmRMXNHKsQx9uM8g87MTQ6JB9TFzMZtVEaLuriNYNpKPPb",
        "__v": 0
    },
    {
        "_id": "5d2339f0caab964024e68057",
        "challanNum": "8423469",
        "platenum": "8423",
        "challanDate": "2019-07-08T12:41:17.469Z",
        "IOTA_Hash": "KDY9LEDIXQXNMQCIXENPEINOOOWZIHEWGDGSAGGUTWWHWBRSPCHSMDHQTDPBTLZMLTCEYHSUOAKAWXYSV",
        "IOTA_Seed": "",
        "IOTA_Channel_Start": 1,
        "IPFS_Hash": "QmRMXNHKsQx9uM8g87MTQ6JB9TFzMZtVEaLuriNYNpKPPb",
        "isAppealed": false,
        "isPaid": false,
        "__v": 0
    },
    {
        "_id": "5d2343603fff5b3abc9f6cd0",
        "challanNum": "8423286",
        "platenum": "8423",
        "challanDate": "2019-07-08T13:21:33.286Z",
        "description": "Signal Jump",
        "geoLat": "17",
        "geoLng": "58",
        "IOTA_Hash": "ERMNDTJAPQGGVBJUSTSZUDFPISBSMTFSYYCDJBCTKGTXPOHKKXNJABOATLDJDDZPDRZQURP9TXSHZNXDH",
        "IOTA_Seed": "",
        "IOTA_Channel_Start": 3,
        "IPFS_Hash": "QmRMXNHKsQx9uM8g87MTQ6JB9TFzMZtVEaLuriNYNpKPPb",
        "isAppealed": true,
        "isPaid": false,
        "__v": 0
    },
    {
        "_id": "5d241ac5b5833a07c487e423",
        "challanNum": "8423114",
        "platenum": "8423",
        "challanDate": "2019-07-09T04:40:34.114Z",
        "description": "Signal Jump",
        "geoLat": "17",
        "geoLng": "58",
        "IOTA_Hash": "HIPGWOLAAJDVZPKYT9TOHTIYEBMBIGWX9MEBFTPUHZMJUDOBRAFASIPEBSXBDQHEQCHKVVDXSUC9YOKHU",
        "IOTA_Seed": "",
        "IOTA_Channel_Start": 1,
        "IPFS_Hash": "QmRMXNHKsQx9uM8g87MTQ6JB9TFzMZtVEaLuriNYNpKPPb",
        "isAppealed": false,
        "isPaid": false,
        "__v": 0
    },
    {
        "_id": "5d2420095b83951eac194469",
        "challanNum": "842331",
        "platenum": "8423",
        "challanDate": "2019-07-09T05:03:02.031Z",
        "description": "Signal Jump",
        "geoLat": "17",
        "geoLng": "58",
        "IOTA_Hash": "YUQNBFPI9QAFLQSEPFGN9HF9IDNCMCRNPNJGONMIGVFKHEDJRNMMMKDXGSXXS9U9CAURIBSCYKAPMTBSS",
        "IOTA_Seed": "",
        "IOTA_Channel_Start": 3,
        "IPFS_Hash": "QmRMXNHKsQx9uM8g87MTQ6JB9TFzMZtVEaLuriNYNpKPPb",
        "isAppealed": true,
        "isAppealAccepted": true,
        "isPaid": false,
        "__v": 0
    }
]

2.post Appeal
1. http://localhost:4000/api/challan/appeal
1. params:
    challannum:842331
    comments:this is not my vehicle
result: 
true

3.post Appeal accept
1. http://localhost:4000/api/challan/appeal/action
1. params:
    challannum:842331
    comments:this is not my vehicle
    accept:true

result: 
true
