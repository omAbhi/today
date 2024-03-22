const PORT = process.env.PORT || 8800;
import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));
app.use("/Uploads", express.static("Uploads"))
app.use("/Cover", express.static("Cover"))
app.use("/BUILDER", express.static("BUILDER"))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
  name: 'Name',
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 600000000000000,
  }
}))


//sql connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dyna"
})

app.get("/builder_DATA", (req, res) => {
  const q = "SELECT * FROM `builder` ";
  db.query(q, (err, data) => {
    if (err) {
      return console.log(err)
    } return res.json(data)
  })
})
// home page
app.get("/home", (req, res) => {
  const q = "SELECT * FROM builder WHERE B_STATUS = 1  ORDER BY ID DESC";
  //const q = "SELECT * FROM dyna WHERE status = 1 ORDER BY ID DESC LIMIT 3";

  db.query(q, (err, data) => {
    if (err) {
      return console.log(err)
    } return res.json(data)
  })
})
//delete operation
app.delete("/:ID", (req, res) => {
  const bookId = req.params.ID;
  const q = "DELETE FROM builder WHERE ID = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.send({ status: err, success: false });
    return res.json({ data: data, success: true });
  })
})
//project details on client side

app.get('/projDet', (req, res) => {
  console.log(req.query.id)
  console.log(req.query.rera)
  const query = `SELECT * FROM builder WHERE RERA = ?`;
  db.query(query, [req.query.rera], (err, data1) => {
    if (err) return res.send(err);
    console.log(req.query.rera, 'rera2')

    myfun(req.query.rera, data1)
    //res.json({ data: 'abcd' })
    function myfun(rera, data1) {

      const query2 = `SELECT * FROM builderbhk WHERE RERA = ?`;
      db.query(query2, [rera], (err, data2) => {
        if (err) console.log(err);
        //console.log('sec tbl')
        //console.log(data2)
        return res.json({ data1, data2 });
      });
    }
  })
})




//sell rent page1
app.post("/form", (req, res) => {
  const values = [
    req.body.data.youare,
    req.body.data.hereto,
    req.body.data.Bcity,
    req.body.data.Bemail,
    req.body.data.Bmobile,
  ];

  const sql = "INSERT INTO customer (`AM`, `HERE`, `NAME`,`EMAIL`, `MOBILE`) VALUES (?)";
  db.query(sql, [values], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      return res.json(data);
    }
  })
});
// signup
app.post("/signup", (req, res) => {
  const sql = "INSERT INTO signup (`SIGNUP_ID`,`NAME`,`EMAIL`,`MOBILE`,`PASSWORD`,`USER_TYPE`) VALUES (?)";
  const name = req.body.data.name;
  const email = req.body.data.email;
  const mobile = req.body.data.mobile;
  const pass = req.body.data.pass;
  const signupid = uuidv4();
  const userType = req.body.userType
  const values = [signupid, name, email, mobile, pass, userType];

  const q = 'SELECT COUNT(*) AS count FROM signup WHERE MOBILE = ?';
  console.log(values)

  db.query(q, [mobile], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      //console.log(data[0].count)
      if (data[0].count == 0) {
        db.query(sql, [values], (err, data) => {
          if (err) return res.send(err);
          return res.json(data);
        })
      } else {
        res.json({ status: 'exists' })
      }
    }
  })



});


app.get('/appp', (req, res) => {
  if (req.session.username) {
    return res.json({ valid: true, username: req.session.username })
  } else {
    return res.json({ valid: false })
  }
})



/*app.post('/login', (req, res) => {
  const { username, pass } = req.body.data;

  // Query to check if the email and password exist in Table1
  const queryTable1 = 'SELECT SIGNUP_ID, NAME FROM signup WHERE EMAIL = ? AND PASSWORD = ?';

  // Query to check if the email and password exist in Table2
  const queryTable2 = 'SELECT SIGNUP_ID, NAME FROM admin WHERE email = ? AND password = ?';

  // Using a Promise to execute both queries
  const checkLoginPromises = [
    new Promise((resolve, reject) => {
      db.query(queryTable1, [username, pass], (err, results) => {
        if (err) {
          reject(err);
        } else {
          //req.session.username = results[0].NAME;
          //console.log(results)
          resolve(results.length > 0 ? results[0] : null);
        }
      });
    }),
    new Promise((resolve, reject) => {
      db.query(queryTable2, [username, pass], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0 ? results[0] : null);
        }
      });
    })
  ];

  // Execute both queries and send the response
  Promise.all(checkLoginPromises)
    .then(([table1Result, table2Result]) => {
      const result = { table1: table1Result, table2: table2Result };
      //res.json(result);

      if (result.table1) {
        req.session.username = result.table1.NAME;
        //console.log(req.session.username, 't1')
        res.json({ table1: result.table1, Login: true, admin: false })
      } else {
        req.session.username = result.table2.NAME;
        //console.log(req.session.username, 't2')
        res.json({ table1: result.table2, Login: true, admin: true })
      }

      //res.json(result)

    })
    .catch((error) => {
      res.json({ Login: false });
    });
});*/



/*app.get('/logout', (req, res) => {
  res.cookie('Name', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  })
  res.send({ success: true })
})*/


app.post('/login', (req, res) => {
  const { username, pass } = req.body.data;
  console.log(username, pass, 'strng')
  const queryTable1 = 'SELECT SIGNUP_ID, NAME FROM signup WHERE EMAIL = ? AND PASSWORD = ?';
  const queryTable2 = 'SELECT SIGNUP_ID, NAME FROM admin WHERE email = ? AND password = ?';

  db.query(queryTable1, [username, pass], (err, data1) => {
    if (err) {
      res.send(err)
    }
    if (data1.length > 0) {
      console.log(data1)
      return res.json({ 'data': data1, "Admin": false })
    } else {
      db.query(queryTable2, [username, pass], (err, data2) => {
        if (data2.length > 0) {
          console.log(data2)
          return res.json({ 'data': data2, "Admin": true })
        } else {
          res.send(err)
        }
      })
    }
  })
})

//logout
app.post('/logout', (req, res) => {
  console.log(req.cookies.loginSuccessful)
  console.log(req.cookies.adminStatus)
  res.clearCookie('loginSuccessful')
  res.clearCookie('adminStatus')
  return res.json({ success: true })

})



//page info
app.get("/property", (req, res) => {
  const sql = "SELECT * FROM signup WHERE SIGNUP_ID=?";
  const value = [req.query.user];
  //console.log(value)
  db.query(sql, [value], (err, data) => {
    if (err) {
      return res.send(err);
    } else {
      //console.log(data);
      return res.json(data);
    }

  })
})


// fetch client table data on frontend
app.get("/client_requests", (req, res) => {
  const sql = "SELECT * FROM client";
  db.query(sql, (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      //return res.json(data)
      const userDetail = getUserDetail(data);
      //res.send({ 'data': data, 'user': userDetail })
    }
  })

  const getUserDetail = (data) => {
    const sql2 = "SELECT * FROM signup";
    db.query(sql2, (err, data2) => {
      if (err) {
        console.log(err)
      } else {
        res.send({ 'data': data, 'user': data2 })
      }
    })
  }
});


//status client
app.put("/status", (req, res) => {
  //console.log(req.body.btnId);
  const sql = "SELECT * FROM client WHERE SIGNUP_ID = ?";
  const value = [req.body.btnId];
  db.query(sql, [value], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(data[0].STATUS)
      if (data[0].STATUS == 0) {
        const q = "UPDATE client SET STATUS =? WHERE SIGNUP_ID = ?";
        db.query(q, [1, value], (err, data) => {
          if (err) {
            console.log(err)
          }
        })
      } else {
        const q = "UPDATE client SET STATUS =? WHERE SIGNUP_ID = ?";
        db.query(q, [0, value], (err, data) => {
          if (err) {
            console.log(err)
          }
        })
      }
    }
  })
});
//status Builder
app.put("/builder_status", (req, res) => {
  //console.log(req.body.btnId);
  const sql = "SELECT * FROM builder WHERE ID = ?";
  const value = [req.body.BID];
  db.query(sql, [value], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(data[0].STATUS)
      if (data[0].B_STATUS == 0) {
        const q = "UPDATE builder SET B_STATUS =? WHERE ID = ?";
        db.query(q, [1, value], (err, data) => {
          if (err) {
            console.log(err)
          }
        })
      } else {
        const q = "UPDATE builder SET B_STATUS =? WHERE ID = ?";
        db.query(q, [0, value], (err, data) => {
          if (err) {
            console.log(err)
          }
        })
      }
    }
  })
});

//CREATE BUILDER FORM 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'BUILDER/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });


app.post('/builder33', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'cover', maxCount: 50 }, { name: 'brochure', maxCount: 50 }, { name: 'video', maxCount: 1 }, { name: 'image3', maxCount: 50 }]), (req, res) => {
  let minPrice = Number(req.body.min_price)
  let maxPrice = Number(req.body.max_price)
  let minPrice2 = 0
  let maxPrice2 = 0

  if (minPrice < 100000) {
    minPrice2 = (minPrice / 1000).toFixed(1).toString() + "T"
  }
  else if (minPrice < 10000000) {
    minPrice2 = (minPrice / 100000).toFixed(1).toString() + "L"
  }
  else if (minPrice < 1000000000) {
    minPrice2 = (minPrice / 10000000).toFixed(1).toString() + "Cr"
  }

  if (maxPrice < 100000) {
    maxPrice2 = (maxPrice / 1000).toFixed(1).toString() + "T"
  }
  else if (maxPrice < 10000000) {
    maxPrice2 = (maxPrice / 100000).toFixed(1).toString() + "L"
  }
  else if (maxPrice < 1000000000) {
    maxPrice2 = (maxPrice / 10000000).toFixed(1).toString() + "Cr"
  }

  const values = [
    uuidv4(),
    req.body.name,
    req.body.city,
    req.body.locality,
    req.body.rera,
    req.body.selectedValues,
    req.body.min_sqft,
    req.body.max_sqft,
    req.body.bldname,
    minPrice2,
    maxPrice2,
    req.body.address,
    req.files['photo']?.map((file) => file.filename).join(','),
    req.files['cover']?.map((file) => file.filename).join(','),
    req.body.units,
    req.body.acres,
    req.body.propType,
    req.body.possesion,
    req.body.date,
    req.body.overview,
    req.files['brochure']?.map((file) => file.filename).join(','),
    req.body.sport,
    req.body.safety,
    req.body.paint,
    req.body.floor,
    req.body.floor2,
    req.body.wall,
    req.body.floor3,
    req.body.bathroom,
    req.body.ceiling ? req.body.ceiling : '',
    req.body.structure,
    req.files['video']?.map((file) => file.filename).join(',')
  ]

  const { unitss, area, price } = req.body;
  const { rera2 } = req.body;

  const image3 = req.files['image3']?.map((file) => file.filename).join(',')
  const layout = image3 ? image3.split(',') : [];

  let newPrice2 = [];

  // Convert elements of price array to numbers and set newPrice2 accordingly
  newPrice2 = price.map((p) => {
    let newPrice = Number(p);
    if (!isNaN(newPrice)) {
      if (newPrice < 100000) {
        return (newPrice / 1000).toFixed(2) + "T";
      } else if (newPrice < 10000000) {
        return (newPrice / 100000).toFixed(2) + "L";
      } else if (newPrice < 1000000000) {
        return (newPrice / 10000000).toFixed(2) + "Cr";
      }
    }
    return 0; // Default value if price is not a valid number
  });
  const values2 = [rera2, unitss, area, newPrice2, layout]

  console.log(layout, 'layout')
  console.log(values2, 'val2')
  console.log(price, 'price')
  console.log(newPrice2, 'newPrice2')

  const result = [];

  for (let i = 0; values2[0] && i < values2[0].length; i++) {
    const element = [];
    for (let j = 0; j < values2.length; j++) {
      element.push(values2[j][i]);
    }
    result.push(element);
  }
  console.log(values, 'val1')
  console.log(result, 'result')
  const q = 'SELECT COUNT(*) AS count FROM builder WHERE RERA = ?';
  const sql = "INSERT INTO builder (`BUILDER_ID`,`PROJECT_NAME`,`CITY`,`LOCALITY`,`RERA`,`BHK`,`MIN_SQFT`,`MAX_SQFT`,`BUILDER_NAME`,`MIN_PRICE`,`MAX_PRICE`,`D_ADDRESS`,`THUMBNAIL`,`COVER`,`TOTAL_UNITS`,`TOTAL_ACRES`,`PROPERTY_TYPE`,`POSSESSION`,`POSSESSION_DATE`,`OVERVIEW`,`BROCHURE`,`SPORTS`,`SAFETY`,`B_WALLS`,`B_FLOOR`,`OTHER_BFLOOR`,`WALLS`,`L_FLOOR`,`BATHROOM`,`CEILING_HT`,`STRUCTURE`,VIDEO ) VALUES (?)";

  db.query(q, [values.rera], (err, data0) => {
    if (err) {
      console.log(err)
    } else {
      if (data0[0].count == 0) {
        db.query(sql, [values], (err, data) => {
          if (err) {
            console.log(err, " builder err")
            return res.send('error')
          }
          else {
            builderBHK(result, res);
          }
        })
      } else {
        console.log(err, ' RERA No already exist')
      }
    }
  })
});

const builderBHK = (data, res) => {
  console.log("bhk fun")
  console.log(data, " data")
  const sql = " INSERT INTO builderbhk (`RERA`,`B_UNIT`,`B_SQFT`,`B_PRICE`,`B_LAYOUT`) VALUES (?)";
  Promise.all(
    data.map((item) => {
      return new Promise((resolve, reject) => {
        db.query(sql, [item], (err, data0) => {
          if (err) {
            console.log(err)
            reject(err);
          } else {
            resolve();
          }
        })
      });
    })
  )
    .then(() => {
      res.send("success");
    })
    .catch((err) => {
      res.send("error");
    });
}




//get bhk wise detailed
app.get("/detail_bhk/:ID", (req, res) => {
  const ID = req.params.ID;
  //console.log(ID)
  const sql = "SELECT * FROM builderbhk WHERE ID = ?";
  db.query(sql, [ID], (err, data1) => {
    if (err) {
      return res.send(err)
    } else {
      //return res.json(data1)
      myFun(data1[0].RERA, data1)
    }
  });
  function myFun(rera, data1) {
    //console.log(data1)
    const sql = "SELECT * FROM builder WHERE RERA = ?";
    const value = rera;
    //console.log(value)
    db.query(sql, [value], (err, data2) => {
      if (err) {
        return res.send(err)
      } else {
        //return res.json({data1,data2})
        myFun2(data2[0].RERA, data2)
      }
    });
    function myFun2(rera, data2) {
      const sql = " SELECT * FROM builderbhk WHERE RERA = ?";
      const value = rera;
      db.query(sql, [value], (err, data3) => {
        if (err) {
          return res.send(err)
        } else {
          return res.json({ data1, data2, data3 })
        }
      })
    }
  }
});


app.post("/send2", upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'cover', maxCount: 15 }]), (req, res) => {
  let newPrice = Number(req.body.price);
  let newPrice2 = 0;

  if (newPrice < 100000) {
    //newPrice2 = (newPrice / 1000).toFixed(1).toString() + "T"
    newPrice2 = newPrice;
  }
  else if (newPrice < 10000000) {
    newPrice2 = (newPrice / 100000).toFixed(1).toString() + "L"
  }
  else if (newPrice < 1000000000) {
    newPrice2 = (newPrice / 10000000).toFixed(1).toString() + "Cr"
  }
  const sql = "INSERT INTO  client (`SIGNUP_ID`,`CUST_PURP`,`PROPERTY_NAME`,`PROPERTY_TYPE`,`BUILDING_TYPE`,`POSSESSION_STATUS`,`FURNISHING`,`PARKING`,`FLOOR_NO`,`TOTAL_FLOOR`,`BALCONY`,`AGE_OF_PROPERTY`,`PROPERTY_OWNER`,`OWNER_NAME`,`LOCALITY`,`CITY`,`BHK`,`SQFT`,`D_ADDRESS`,`BATHROOM`,`PRICE`,`CONTACT`,`NEGOTIABLE`,`FRONT_AREA`,`CEILING_HT`,`AVAILABLE_FROM`,`PROP_IMAGE`,`COVER_IMAGE`,`Posted`) VALUES (?)";
  const value = [
    req.body.id,
    req.body.hereto,
    req.body.building_name,
    req.body.property_type,
    req.body.building_type,
    "Ready To Move",
    //req.body.possession,
    req.body.furnishing,
    req.body.parking,
    req.body.floor_no,
    req.body.total_floor_no,
    req.body.balcony,
    req.body.property_age,
    req.body.owner_type,
    req.body.owner_name,
    req.body.locality,
    req.body.city,
    req.body.bhk + " BHK",
    req.body.sqft,
    req.body.d_address,
    req.body.bathroom,
    newPrice2,
    req.body.contact_number,
    req.body.negotiable,
    req.body.frontarea,
    req.body.ceilingHt,
    req.body.Available_From,
    req.files['profile'].map((file) => file.filename).join(','),
    req.files['cover'].map((file) => file.filename).join(','),
    1,

  ];
  console.log(value)

  ////////checking already posted//////

  const q = 'SELECT COUNT(*) AS count FROM client WHERE SIGNUP_ID = ?';
  db.query(q, [req.body.id], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      if (data[0].count == 0) {
        db.query(sql, [value], (err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send(data)
          }
        })
      } else {
        res.json({ status: 'already posted' })
      }


    }
  })


})


/////////admin posting individual prop//////

app.post('/adminIndividualPost', upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'cover', maxCount: 15 }]), (req, res) => {

  let newPrice = Number(req.body.price);
  let newPrice2 = 0;

  if (newPrice < 100000) {
    //newPrice2 = (newPrice / 1000).toFixed(2).toString() + "T"
    newPrice2 = newPrice
  }
  else if (newPrice < 10000000) {
    newPrice2 = (newPrice / 100000).toFixed(2).toString() + "L"
  }
  else if (newPrice < 1000000000) {
    newPrice2 = (newPrice / 10000000).toFixed(2).toString() + "Cr"
  }
  //const sql = "INSERT INTO  adminclient2 (`SIGNUP_ID`,`CUST_PURP`,`PROPERTY_NAME`,`PROPERTY_TYPE`,`BUILDING_TYPE`,`POSSESSION_STATUS`,`FURNISHING`,`PARKING`,`FLOOR_NO`,`TOTAL_FLOOR`,`BALCONY`,`AGE_OF_PROPERTY`,`PROPERTY_OWNER`,`OWNER_NAME`,`LOCALITY`,`CITY`,`BHK`,`SQFT`,`D_ADDRESS`,`BATHROOM`,`PRICE`,`CONTACT`,`NEGOTIABLE`,`FRONT_AREA`,`CEILING_HT`,`PROP_IMAGE`,`COVER_IMAGE`,`Posted`,`property_id`) VALUES (?)";
  const sql2 = "INSERT INTO  client (`SIGNUP_ID`,`CUST_PURP`,`PROPERTY_NAME`,`PROPERTY_TYPE`,`BUILDING_TYPE`,`POSSESSION_STATUS`,`FURNISHING`,`PARKING`,`FLOOR_NO`,`TOTAL_FLOOR`,`BALCONY`,`AGE_OF_PROPERTY`,`PROPERTY_OWNER`,`OWNER_NAME`,`LOCALITY`,`CITY`,`BHK`,`SQFT`,`D_ADDRESS`,`BATHROOM`,`PRICE`,`CONTACT`,`NEGOTIABLE`,`FRONT_AREA`,`CEILING_HT`,`AVAILABLE_FROM`,`PROP_IMAGE`,`COVER_IMAGE`,`Posted`) VALUES (?)";
  const uniqueId = uuidv4();

  const values = [

    uniqueId,
    req.body.hereto,
    req.body.building_name,
    req.body.property_type,
    req.body.building_type,
    "Ready To Move",
    //req.body.possession,
    req.body.furnishing,
    req.body.parking,
    req.body.floor_no,
    req.body.total_floor_no,
    req.body.balcony,
    req.body.property_age,
    req.body.owner_type,
    req.body.owner_name,
    req.body.locality,
    req.body.city,
    req.body.bhk + " BHK",
    req.body.sqft,
    req.body.d_address,
    req.body.bathroom,
    newPrice2,
    req.body.contact_number,
    req.body.negotiable,
    //req.body.email,
    req.body.frontarea,
    req.body.ceilingHt,
    req.body.availableFrom,
    req.files['profile'].map((file) => file.filename).join(','),
    req.files['cover'].map((file) => file.filename).join(','),
    0,

  ]

  const values2 = [
    uniqueId,
    req.body.owner_name,
    req.body.email,
    req.body.contact_number,
    uuidv4().slice(30),
    "Owner"

  ]
  console.log(values)
  console.log(values2)


  db.query(sql2, [values], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      //res.send(data)
      console.log(data)
      CreateUser(values2)
      /*if (data2 === 'success') {
        //res.send(data)
      }*/
    }
  })

  const CreateUser = (values) => {
    console.log('user')
    const q = "INSERT INTO signup (`SIGNUP_ID`,`NAME`,`EMAIL`,`MOBILE`,`PASSWORD`,`USER_TYPE`) VALUES (?)";
    db.query(q, [values], (err, data2) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data2)
        res.send('success')

      }
    })
  }

});


//user Edit Form update//update
app.put('/userEdit', upload.fields([{ name: 'PROP_IMAGE', maxCount: 1 }, { name: 'COVER_IMAGE', maxCount: 15 }]), (req, res) => {
  console.log('user-edit');

  const sql = 'UPDATE `client` SET `CUST_PURP`=?, `PROPERTY_NAME`=?, `PROPERTY_TYPE`=?, `BUILDING_TYPE`=?, `POSSESSION_STATUS`=?, `FURNISHING`=?, `PARKING`=?, `FLOOR_NO`=?, `TOTAL_FLOOR`=?, `BALCONY`=?, `AGE_OF_PROPERTY`=?, `PROPERTY_OWNER`=?, `OWNER_NAME`=?, `LOCALITY`=?, `CITY`=?, `BHK`=?, `SQFT`=?, `D_ADDRESS`=?, `BATHROOM`=?, `PRICE`=?, `CONTACT`=?, `NEGOTIABLE`=?, `FRONT_AREA`=?, `CEILING_HT`=?, `PROP_IMAGE`=?, `COVER_IMAGE`=?, `Posted`=?, `STATUS`=? WHERE SIGNUP_ID=?';

  const id = req.body.SIGNUP_ID;
  console.log(id);

  const value = [
    req.body.CUST_PURP,
    req.body.PROPERTY_NAME,
    req.body.PROPERTY_TYPE,
    req.body.BUILDING_TYPE,
    "Ready To Move",
    req.body.FURNISHING,
    req.body.PARKING,
    req.body.FLOOR_NO,
    req.body.TOTAL_FLOOR,
    req.body.BALCONY,
    req.body.AGE_OF_PROPERTY,
    req.body.PROPERTY_OWNER,
    req.body.OWNER_NAME,
    req.body.LOCALITY,
    req.body.CITY,
    req.body.BHK,
    req.body.SQFT,
    req.body.D_ADDRESS,
    req.body.BATHROOM,
    req.body.PRICE,
    req.body.CONTACT,
    req.body.NEGOTIABLE,
    req.body.FRONT_AREA,
    req.body.CEILING_HT,
    req.files['PROP_IMAGE']?.map((file) => file.filename).join(','),
    req.files['COVER_IMAGE']?.map((file) => file.filename).join(','),
    1,
    0
  ];

  db.query(sql, [...value, id], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(data)
      res.json({ status: 'success' })
    }
  });

  console.log(value);
});




////user prop upload new///////
app.post('/userSend2', (req, res) => {
  //const { data1 } = req.body.data1
  console.log('type')
  console.log(req.body.type1)
})





app.get('/mydash', (req, res) => {
  //console.log(req.body.id)
})

app.get('/userDashboard', (req, res) => {
  //console.log(req.query.id)
  const sql = "SELECT * FROM client WHERE SIGNUP_ID = ?";

  db.query(sql, [req.query.id], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      //console.log(data)
      res.send(data)

    }
  })

})

//user posted prop delete req//
app.delete('/userDeleteProperty/:id', (req, res) => {
  const id = req.params.id
  const q = 'DELETE FROM client WHERE SIGNUP_ID=?';

  db.query(q, [id], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      //console.log('success delete')
      res.json({ status: 'success' })
    }
  })
})



//builder form edit
app.get('/editBuilderProp', (req, res) => {
  const id = req.query.id
  const q = 'SELECT * FROM builder WHERE id=?'

  const bhkFun = (id, data) => {
    const q2 = 'SELECT * FROM builderbhk WHERE RERA=?';

    db.query(q2, [id], (err, data2) => {
      if (err) {
        console.log(err)
      } else {
        //console.log(data, data2)
        res.send({ data, data2 })
      }
    })
  }

  db.query(q, [id], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      //console.log(data[0])
      //res.send(data)
      bhkFun(data[0].RERA, data)
    }


  })
})

/////builder edit Submit/////
///////////////////////////////////////////////////////

//builder form edit
app.get('/editBuilderProp', (req, res) => {
  const id = req.query.id

  const q = 'SELECT * FROM builder WHERE id=?'


  const bhkFun = (rera, data) => {
    const q2 = 'SELECT * FROM builderbhk WHERE RERA=?';

    db.query(q2, [rera], (err, data2) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data, data2)
        res.send({ data, data2 })
      }
    })
  }

  db.query(q, [id], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      //console.log(data[0].RERA,data)
      //res.send(data)
      bhkFun(data[0].RERA, data)
    }


  })
})

/////builder edit Submit/////

app.put('/builderEditSubmit', upload.fields([{ name: 'THUMBNAIL', maxCount: 1 }, { name: 'coverimg', maxCount: 50 }, { name: 'video', maxCount: 1 }, { name: 'brochure', maxCount: 50 }]), (req, res) => {
  const id = req.body.id;
  const values = [
    req.body.PROJECT_NAME,
    req.body.CITY,
    req.body.LOCALITY,
    req.body.RERA,
    req.body.BHK,
    req.body.MIN_SQFT,
    req.body.MAX_SQFT,
    req.body.builderName,
    req.body.MIN_PRICE,
    req.body.MAX_PRICE,
    req.body.D_ADDRESS,
    req.files['THUMBNAIL'] ? req.files['THUMBNAIL']?.map((file) => file.filename).join(',') : req.body.THUMBNAIL,
    req.files['coverimg'] ? req.files['coverimg']?.map((file) => file.filename).join(',') : req.body.coverimg,
    req.body.TOTAL_UNITS,
    req.body.TOTAL_ACRES,
    req.body.PROJECT_TYPE,
    req.body.POSSESSION,
    req.body.date,
    req.body.OVERVIEW,
    req.files['brochure'] ? req.files['brochure'].map((file) => file.filename).join(',') : req.body.brochure,
    req.body.sports,
    req.body.safety,
    req.body.B_WALLS,
    req.body.B_FLOOR,
    req.body.OTHER_BFLOOR,
    req.body.WALLS,
    req.body.L_FLOOR,
    req.body.BATHROOM,
    req.body.STRUCTURE,
    req.files['video'] ? req.files['video'].map((file) => file.filename).join(',') : req.body.video


  ]
  //console.log(id, "ID")
  // console.log("value" , values)

  const sql = "UPDATE `builder` SET `PROJECT_NAME`=?,`CITY`=?,`LOCALITY`=?,`RERA`=?,`BHK`=?,`MIN_SQFT`=?,`MAX_SQFT`=?,`BUILDER_NAME`=?,`MIN_PRICE`=?,`MAX_PRICE`=?,`D_ADDRESS`=?,`THUMBNAIL`=?,`COVER`=?,`TOTAL_UNITS`=?,`TOTAL_ACRES`=?,`PROPERTY_TYPE`=?,`POSSESSION`=?,`POSSESSION_DATE`=?,`OVERVIEW`=?,`BROCHURE`=?,`SPORTS`=?,`SAFETY`=?,`B_WALLS`=?,`B_FLOOR`=?,`OTHER_BFLOOR`=?,`WALLS`=?,`L_FLOOR`=?,`BATHROOM`=?,`STRUCTURE`=?,`VIDEO`=?  WHERE ID=? ";

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      return res.json(data)

    }
  })

  //console.log(values)
  // console.log(id)
});

//////////////////

///////////////
app.post('/builderbhkEditSubmit', upload.fields([{ name: 'image', maxCount: 1 }]), (req, res) => {
  const rera = req.body.rera;

  const values = [
    req.body.rera,
    req.body.units,
    req.body.area,
    req.body.price,
    req.files['image'] ? req.files['image'].map((file) => file.filename).join(',') : req.body.image
  ];

  const { id } = req.query;
  console.log(id, " bhkID")


  console.log(values, "bhk")
  const sql = 'UPDATE builderbhk SET `RERA`=?, `B_UNIT` = ?,`B_SQFT`=?,`B_PRICE`=?, `B_LAYOUT`=? WHERE ID =?'
  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.send(err)
    } else {
      console.log(data)
    }
  })

});
////////////////////////////////////////////////////

/*app.post('/builderEditSubmit', upload.fields([{ name: 'image3', maxCount: 19 }, { name: 'THUMBNAIL', maxCount: 1 }, { name: 'coverimg', maxCount: 50 }, { name: 'video', maxCount: 1 }, { name: 'brochure', maxCount: 50 }]), (req, res) => {
  const id = req.body.id;
  /*const values = [
    req.body.PROJECT_NAME,
    req.body.CITY,
    req.body.LOCALITY,
    req.body.RERA,
    req.body.BHK,
    req.body.MIN_SQFT,
    req.body.MAX_SQFT,
    req.body.builderName,
    req.body.MIN_PRICE,
    req.body.MAX_PRICE,
    req.body.D_ADDRESS,
    req.files['THUMBNAIL'] ? req.files['THUMBNAIL']?.map((file) => file.filename).join(',') : req.body.THUMBNAIL,
    req.files['coverimg'] ? req.files['coverimg']?.map((file) => file.filename).join(',') : req.body.coverimg,
    req.body.TOTAL_UNITS,
    req.body.TOTAL_ACRES,
    req.body.PROJECT_TYPE,
    req.body.POSSESSION,
    req.body.date,
    req.body.OVERVIEW,
    req.files['brochure'] ? req.files['brochure'].map((file) => file.filename).join(',') : req.body.brochure,
    req.body.sports,
    req.body.safety,
    req.body.B_WALLS,
    req.body.B_FLOOR,
    req.body.OTHER_BFLOOR,
    req.body.WALLS,
    req.body.L_FLOOR,
    req.body.BATHROOM,
    req.body.STRUCTURE,
    req.files['video'] ? req.files['video'].map((file) => file.filename).join(',') : req.body.video

  ]*

  const values2 = [
    req.body.unitsBhk,
    req.body.areaBhk,
    req.body.priceBhk,
    req.files['image3'] ? req.files['image3'].map((file) => file.filename).join(',') : "asd",
    req.body.id,
  ]


  console.log(id, "ID")
  //console.log("value", values)

  const sql = "UPDATE `builder` SET `PROJECT_NAME`=?,`CITY`=?,`LOCALITY`=?,`RERA`=?,`BHK`=?,`MIN_SQFT`=?,`MAX_SQFT`=?,`BUILDER_NAME`=?,`MIN_PRICE`=?,`MAX_PRICE`=?,`D_ADDRESS`=?,`THUMBNAIL`=?,`COVER`=?,`TOTAL_UNITS`=?,`TOTAL_ACRES`=?,`PROPERTY_TYPE`=?,`POSSESSION`=?,`POSSESSION_DATE`=?,`OVERVIEW`=?,`BROCHURE`=?,`SPORTS`=?,`SAFETY`=?,`B_WALLS`=?,`B_FLOOR`=?,`OTHER_BFLOOR`=?,`WALLS`=?,`L_FLOOR`=?,`BATHROOM`=?,`STRUCTURE`=?,`VIDEO`=?  WHERE ID=? ";

  /*db.query(sql, [...values, id], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      return res.json(data)

    }
  })*

  console.log(values2, " BHKvalues")
  // console.log(id)
})*/


//userPropEdit//fetch
app.get('/userPropEdit', (req, res) => {
  const id = req.query.id

  const q = 'SELECT * FROM client WHERE SIGNUP_ID=?';
  db.query(q, [id], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send(data)
    }
  })
})


///getDisclaimer////
app.get('/getDisclaimer', (req, res) => {
  const q = 'SELECT Disclaimer FROM admin';

  db.query(q, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send(data)
    }
  })
})

//postUserProp
app.post('/postUserProp', upload.single('image'), (req, res) => {
  const { data1 } = req.body;
  //const { textInput2 } = req.body;
  // const imageBuffer = req.files;
  /*const value = [
    req.body.data1,

  ]*/

  console.log(data1)


});


//navSale
app.get("/navSale", (req, res) => {
  const sql = "SELECT * FROM client WHERE CUST_PURP = 'Sell' AND STATUS = 1  ORDER BY ID DESC";
  db.query(sql, (err, data) => {
    if (err) {
      res.send(err)
    }
    else {
      return res.json(data)
    }
  })
})
//navRent
app.get("/navRent", (req, res) => {
  const sql = "SELECT * FROM client WHERE CUST_PURP = 'Rent/Lease' AND STATUS = 1  ORDER BY ID DESC ";
  db.query(sql, (err, data) => {
    if (err) {
      res.send(err)
    }
    else {
      return res.json(data)
    }
  })
})
//navProject
app.get("/navProject", (req, res) => {
  const sql = "SELECT * FROM builder WHERE B_STATUS = 1  ORDER BY ID DESC ";
  db.query(sql, (err, data) => {
    if (err) {
      res.send(err)
    }
    else {
      return res.json(data)
    }
  })
})
//Client Property Details
app.get("/Sell-Rent/Details", (req, res) => {
  const SIGNUP_ID = req.query.SIGNUP_ID;
  //console.log(SIGNUP_ID)
  const sql = "SELECT * FROM client WHERE SIGNUP_ID = ?";
  db.query(sql, [SIGNUP_ID], (err, data) => {
    if (err) {
      res.send(err)
    } else {
      return res.json(data)
    }
  })
})


//search
app.get('/search', (req, res) => {
  const { query } = req.query;

  const sql = `
    SELECT 
        CASE 
            WHEN PROJECT_NAME LIKE '${query}%' THEN PROJECT_NAME 
            WHEN CITY LIKE '${query}%' THEN CITY 
            WHEN LOCALITY LIKE '${query}%' THEN LOCALITY 
            WHEN BHK LIKE '${query}%' THEN BHK 
            WHEN PROPERTY_TYPE LIKE '${query}%' THEN PROPERTY_TYPE 
        END AS matched_column
    FROM builder 
    WHERE 
        PROJECT_NAME LIKE '${query}%' OR 
        CITY LIKE '${query}%' OR 
        LOCALITY LIKE '${query}%' OR 
        BHK LIKE '${query}%' OR 
        PROPERTY_TYPE LIKE '${query}%';
`;

  const sql2 = `
    SELECT 
        CASE 
            WHEN PROPERTY_NAME LIKE '${query}%' THEN PROPERTY_NAME 
            WHEN CITY LIKE '${query}%' THEN CITY 
            WHEN LOCALITY LIKE '${query}%' THEN LOCALITY 
            WHEN BHK LIKE '${query}%' THEN BHK 
            WHEN PROPERTY_TYPE LIKE '${query}%' THEN PROPERTY_TYPE 
        END AS matched_column
    FROM client 
    WHERE 
        PROPERTY_NAME LIKE '${query}%' OR 
        CITY LIKE '${query}%' OR 
        LOCALITY LIKE '${query}%' OR 
        BHK LIKE '${query}%' OR 
        PROPERTY_TYPE LIKE '${query}%';
`;


  let builderData, clientData;
  db.query(sql, (err, result1) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
    builderData = result1;
  });

  db.query(sql2, (err, result2) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
    clientData = result2;

    // Combine results from both queries
    const combinedResults = [...builderData, ...clientData];

    return res.json(combinedResults);
  });
});

//search details

app.get('/searchdetails', (req, res) => {
  const { id } = req.query;
  console.log(id, "dtails")
  const q1 = 'SELECT * FROM client WHERE SIGNUP_ID = ?';
  const sql2 = 'SELECT * FROM builder WHERE BUILDER_ID = ?';
  let Data1, Data2;

  db.query(q1, [id], (err, data) => {
    if (err) {
      console.log(err)
    }
    if (data.length > 0) {
      console.log(data, 'clieny')
      res.send(data)
    } else {
      db.query(sql2, [id], (err, data2) => {
        if (err) {
          console.log(err)
        } else {
          bhk(data2[0].RERA, data2)
        }
        function bhk(rera, data2) {
          const q3 = "SELECT * FROM builderbhk WHERE RERA = ?";
          db.query(q3, [rera], (err, result) => {
            if (err) {
              console.log(err)
            } else {
              return res.json({ data2, result })
            }
          })
        }
      })
    }
  })
})
//search all card
app.get('/search2Cards', (req, res) => {
  const { cook } = req.query;
  console.log(cook);
  let Bdetails, Cdetails;

  const sql1 = `SELECT * FROM builder WHERE 
    PROJECT_NAME LIKE '${cook}%' OR 
    CITY LIKE '${cook}%' OR 
    LOCALITY LIKE '${cook}%' OR 
    BHK LIKE '${cook}%' OR 
    PROPERTY_TYPE LIKE '${cook}%' `;

  const sql2 = `SELECT * FROM client WHERE 
    PROPERTY_NAME LIKE '${cook}%' OR 
    CITY LIKE '${cook}%' OR 
    LOCALITY LIKE '${cook}%' OR 
    BHK LIKE '${cook}%' OR 
    PROPERTY_TYPE LIKE '${cook}%' `;

  db.query(sql1, (err, result1) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    Bdetails = result1;

    db.query(sql2, (err, result2) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      Cdetails = result2;

      const totalData = [...Bdetails, ...Cdetails];
      console.log(totalData);
      res.send(totalData); // Assuming you want to send the data back as a response
    });
  });
});

//admin individual edit property
app.get("/adminIndividualEdit", (req, res) => {
  const id = req.query.id
  const q = "SELECT * FROM client WHERE SIGNUP_ID=?"

  db.query(q, [id], (err, data) => {
    if (err) {
      //console.log(err)
      res.send("error")
    } else {
      //console.log(data)
      res.send(data)
    }
  })
});
//adminClient side properties Edit function
app.put('/adminsideclientEditSubmit', upload.fields([{ name: 'PROP_IMAGE', maxCount: 1 }, { name: 'COVER_IMAGE', maxCount: 50 }]), (req, res) => {
  const ID = req.body.ID;
  //console.log(ID,'id')
  const values = [
    req.body.CUST_PURP,
    req.body.PROPERTY_NAME,
    req.body.PROPERTY_TYPE,
    req.body.BUILDING_TYPE,
    'Ready To Move',
    req.body.FURNISHING,
    req.body.PARKING,
    req.body.FLOOR_NO,
    req.body.TOTAL_FLOOR,
    req.body.BALCONY,
    req.body.AGE_OF_PROPERTY,
    req.body.PROPERTY_OWNER,
    req.body.OWNER_NAME,
    req.body.LOCALITY,
    req.body.CITY,
    req.body.BHK,
    req.body.SQFT,
    req.body.D_ADDRESS,
    req.body.BATHROOM,
    req.body.PRICE,
    req.body.CONTACT,
    req.files['PROP_IMAGE'] ? req.files['PROP_IMAGE']?.map((file) => file.filename).join(',') : req.body.PROP_IMAGE,
    req.files['COVER_IMAGE'] ? req.files['COVER_IMAGE']?.map((file) => file.filename).join(',') : req.body.COVER_IMAGE,
    req.body.NEGOTIABLE,
  ]
  //console.log(values);
  const sql = "UPDATE `client` SET `CUST_PURP`=?,`PROPERTY_NAME`=?,`PROPERTY_TYPE`=?,`BUILDING_TYPE`=?,`POSSESSION_STATUS`=?,`FURNISHING`=?,`PARKING`=?,`FLOOR_NO`=?,`TOTAL_FLOOR`=?,`BALCONY`=?,`AGE_OF_PROPERTY`=?,`PROPERTY_OWNER`=?,`OWNER_NAME`=?,`LOCALITY`=?,`CITY`=?,`BHK`=?,`SQFT`=?,`D_ADDRESS`=?,`BATHROOM`=?,`PRICE`=?,`CONTACT`=?,`PROP_IMAGE`=?,`COVER_IMAGE`=?,`NEGOTIABLE`=? WHERE `ID` =?";

  db.query(sql, [...values, ID], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.json(data)
    }
  })
})

// contact form / enquiry form submit 
app.post('/enquiryForm', (req, res) => {
  const values = [
    req.body.data.name,
    req.body.data.email,
    req.body.data.mobile,
    req.body.purpose,
    req.body.projName
  ];

  console.log(values, " enquiry")
  const sql = "INSERT INTO enquiry (`NAME`,`EMAIL`,`MOBILE`,`INTEREST`,`PROPERTY_NAME`) VALUES(?) ";
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      return res.json(data)
    }
  })
})

//fetch Enquiry Details
app.get('/fetchEnquiryData', (req, res) => {
  const sql = "SELECT * FROM enquiry ";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      return res.json(data)
    }
  })
})


//testing
app.post('/testing', upload.none(), (req, res) => {
  const name = req.body.name;
  const selectedOptions = JSON.parse(req.body.selectedOptions);

  // Do something with name and selectedOptions, such as saving to a database
  console.log('Received data:', { name, selectedOptions });

  res.send('Data received successfully!');
});






//connection to backend
app.listen(PORT, () => {
  console.log("connected to backend!")
})
/*
//page info
app.get("/property" , (req,res)=>{
   const sql = "SELECT * FROM signup WHERE SIGNUP_ID=?";
   const value  = [req.query.user];
   //console.log(value)
   
   db.query(sql,[value],(err,data)=>{
    if(err) {
       return res.send(err);
    }else{
      //console.log(data);
  return res.json(data);
    }
    
   })
})
app.get('/api/data', (req, res) => {
  const sql = 'SELECT * FROM customer';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching data from MySQL: ', err);
      res.status(500).send('Internal Server Error');
    } else {
      const dataWithImages = result.map((item) => ({
        ...item,
        images: item.IMAGE.split(','), // Assuming IMAGE is a comma-separated list of file names
        coverImages: item.COVER.split(','), // Assuming COVER is a comma-separated list of file names
      }));
      res.json(dataWithImages);
    }
  });
});
app.post('/builder_bhk', (req, res) => {
  const data = req.body.data;
  const data2 = req.body.data2;
  console.log(data2)
  
  // Handle the received data as needed, for example, store it in a database
// Insert data into the 'custom' table
const insertQuery = 'INSERT INTO  builderbhk (RERA,B_UNIT,B_SQFT,B_PRICE) VALUES ? ';
const values = data.map((item) => [data2,item.units, item.area, item.price ]);
console.log(values)
db.query(insertQuery,[values],(err,data)=>{
  if (err) {
    return res.send(err)
  }
  else{
    return res.json(data)
  }
})
});
*/