// var sqlite3 = require('sqlite3').verbose();

// module.exports = {
// db : new sqlite3.Database(':memory:'),
// db.serialize(function() {
//   db.run("CREATE TABLE lorem (info TEXT)");

//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });

// db.close();

var sqlite3 = require('sqlite3').verbose();





class appdb {

  constructor() {
    this.db = new sqlite3.Database('./PROJ_SLVP.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
      if (err) {
        console.error(err.message);
      }
      this.db.run('CREATE TABLE Violation_Details(challanNum text PRIMARY KEY, platenum text NOT NULL, challanDate DATE NOT NULL, IOTA_Hash text NOT NULL, IOTA_Seed text NOT NULL,IOTA_Channel_Start  INTEGER NOT NULL, IPFS_Hash text NOT NULL, isAppealed BOOLEAN, isAppealAccepted BOOLEAN, isPaid BOOLEAN);', function (err) {
        if (err) {
          console.error(err.message);
        }
        console.log("Successfully created Violation_Details table")
      });
    });
  }

  addChallan(challanNum, platenum, challanDate, IOTA_Hash, IOTA_Seed, IPFS_Hash) {

    this.db.run('INSERT INTO Violation_Details VALUES(?,?,?,?,?,1,?,FALSE,FALSE,FALSE)', [challanNum, platenum, challanDate, IOTA_Hash, IOTA_Seed, IPFS_Hash], function (RunResult, err) {
      if (err) {

        return false;
      }

      return this.changes > 0;
    });

    return false;
  }

  // getChallans1: (platenumIn, challanDateIn, isAppealedIn, isPaidIn) => {
  //   let sql = 'SELECT * FROM Violation_Details WHERE CASE WHEN ? IS NULL THEN 1 ELSE platenum END = CASE WHEN ? IS NULL THEN 1 ELSE ? END ' +
  //     'AND CASE WHEN ? IS NULL THEN 1 ELSE challanDate END = CASE WHEN ? IS NULL THEN 1 ELSE ? END ' +
  //     'AND CASE WHEN ? IS NULL THEN 1 ELSE isAppealed END = CASE WHEN ? IS NULL THEN 1 ELSE ? END ' +
  //     'AND CASE WHEN ? IS NULL THEN 1 ELSE isPaid END = CASE WHEN ? IS NULL THEN 1 ELSE ? END';
  //   this.db.all(sql, [platenumIn, platenumIn, platenumIn, challanDateIn, challanDateIn, challanDateIn, isAppealedIn, isAppealedIn, isAppealedIn, isPaidIn, isPaidIn, isPaidIn], function (err, row) {
  //     if (err) {
  //       return console.error(err.message);
  //     }
  //     console.log(row);
  //   })
  // },
  getChallans(platenumIn = "", challanDateIn, isAppealedIn, isPaidIn, func) {
    let rowss = [];
    let sql = "SELECT * FROM Violation_Details  WHERE 1=1 ";
    sql += platenumIn.length > 0 ? " AND platenum = ?" : ""
    sql += challanDateIn != null ? " AND challanDate = $challanDate" : ""
    sql += isAppealedIn != null ? " AND isAppealed = $isAppealed" : ""
    sql += isPaidIn != null ? " AND isPaid = $isPaid" : ""
    this.db.all(sql,  func);//[platenumIn]
  }
  getChallan(challanNum, func) {
    this.db.get("SELECT * FROM Violation_Details WHERE challanNum = ?", challanNum, func)
    //return null;
  }
  appealChallan(challanNum, IOTA_Hash) {
    this.openDB();
    this.db.run('UPDATE Violation_Details SET isAppealed = true,IOTA_Hash=?, IOTA_Channel_Start =  IOTA_Channel_Start+1 WHERE challanNum = ?', [IOTA_Hash, challanNum], function (err) {
      if (err) {
        console.error(err.message);
        this.close();
        return false;
      }
      console.log('Row(s) updated: ' + this.changes);
      this.close();
      return this.changes > 0;
    })
    this.close();
    return false;
  }

  appealAction(challanNum, accept, IOTA_Hash) {
    this.db.run('UPDATE Violation_Details SET isAppealAccepted = ?,IOTA_Hash=?, IOTA_Channel_Start =  IOTA_Channel_Start+1 WHERE challanNum = ?', [accept, IOTA_Hash, challanNum], function (err) {
      if (err) {
        console.error(err.message);
        return false;
      }
      console.log('Row(s) updated: ' + this.changes);
      return this.changes > 0;
    })
    return false;
  }

  payChallan(challanNum, IOTA_Hash) {
    this.db.run('UPDATE Violation_Details SET isPaid = true,IOTA_Hash=?,  IOTA_Channel_Start =  IOTA_Channel_Start+1 WHERE challanNum = ?', [IOTA_Hash, challanNum], function (err) {
      if (err) {
        console.error(err.message);
        return false;
      }
      console.log('Row(s) updated: ' + this.changes);
      return this.changes > 0;
    })
    return false;
  }

  close() {
    this.db.close(function (err) {
      if (err) {
        console.error(err.message);
        return false;
      }
      return true;
      console.log('Closed the PROJ_SLVP database connection.');
    })
    return false;
  }

}


module.exports = appdb;