const express = require("express");
const sequelize = require("./db");
const {
  auth,
  resolver,
  loaders,
  protocol,
  circuits,
} = require("@iden3/js-iden3-auth");
const getRawBody = require("raw-body");
const User = require("./User");
const cors = require("cors");

sequelize.sync().then(() => console.log("db is ready"));

const app = express();
const port = process.env.PORT || 8080;

const originsAllowed = ["localhost:3000", "http://localhost:8080", "http://localhost:8090"];
app.use(cors({ origin: originsAllowed }));
app.use(express.static('/client'));

app.get("/api/sign-in", async (req, res) => {
  console.log("get Auth Request");
  GetAuthRequest(req, res);
  console.log("Finished Auth Request");
});

app.post("/api/callback", (req, res) => {
  console.log("callback");
  Callback(req, res);
});

app.get("/api/requestStatus", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

app.get("/api/requestStatus/:id", async (req, res) => {
  const reqId = req.params.id;
  const user = await User.findOne({ where: { id: reqId } });
  res.send(user);
});

app.listen(port, () => {
  console.log("server running on port 8080");
});

// Create a map to store the auth requests and their session IDs
const requestMap = new Map();

// GetQR returns auth reques
async function GetAuthRequest(req, res) {
  console.log("Enter in AuthRequestMethod");
  console.log(req);
  const caseOfUse = req.originalUrl.split("=")[1];
  console.log("Params:", caseOfUse);
  // Audience is verifier id
  const proxyHeroku = "https://radiant-harbor-95836.herokuapp.com/";
  const hostUrl =  "https://serverbancol.herokuapp.com";
  let idRequest = createId();
  const sessionId = idRequest;
  const callbackURL = "/api/callback";
  const audience = "117fsb3hktLw8ie9E6Qj9kfgRHXhLxq9XYaedsJdGU";

  const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

  // Generate request for basic authentication
  const request = auth.createAuthorizationRequestWithMessage(
    "test flow",
    "message to sign",
    audience,
    uri
  );

  console.log("Request created");
  const user = User.create({
    id: idRequest,
    state: 1,
  });

  request.id = '7f38a193-0918-4a48-9fac-36adfdb8b542';
	request.thid = '7f38a193-0918-4a48-9fac-36adfdb8b542';

  // Add request for a specific proof
  //Credit card ID Cuenta
  /*const proofRequest = {
		id: 1, // request id
		circuit_id: 'credentialAtomicQuerySig',
		rules: {
		  query: {
			allowedIssuers: ['*'], // ID of the trusted issuers
			schema: {
			  type: 'CuentaAhorrosBancolombia',
			  url: 'https://platform-test.polygonid.com/claim-link/7721dfb0-b142-4e52-a1b9-24d7f994a185',
			},
			req: {
			  IDCuenta: {
				$lt: 999999999999999999, 
			  },
			},
		  },
		},
	  };
	console.log('ProofRequest created');
	const scope = request.body.scope ?? [];
	request.body.scope = [...scope, proofRequest];*/

  if (caseOfUse === "crearCuentaAhorros") {
    console.log("Caso crear cuenta mayor de 12 años");
    //Credit card Saldo
    const proofRequest = {
      id: idRequest, // request id
      circuit_id: "credentialAtomicQuerySig",
      rules: {
        query: {
          allowedIssuers: ["*"], // ID of the trusted issuers
          schema: {
            type: "CedulaCiudadania",
            url: "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/e6c15ccf-3ffb-4135-8832-417d2c91d4ba.json-ld",
          },
          req: {
            fechaNacimiento: {
              $lt: 20100101,
            },
          },
        },
      },
    };
    console.log("ProofRequest created");
    const scope = request.body.scope ?? [];
    request.body.scope = [...scope, proofRequest];
  }
  if (caseOfUse === "tarjetaCredito") {
    console.log("Caso crear cuenta mayor de 12 años");
    //Credit card Saldo
    const proofRequest = {
      id: idRequest, // request id
      circuit_id: "credentialAtomicQuerySig",
      rules: {
        query: {
          allowedIssuers: ["*"], // ID of the trusted issuers
          schema: {
            type: "CedulaCiudadania",
            url: "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/e6c15ccf-3ffb-4135-8832-417d2c91d4ba.json-ld",
          },
          req: {
            fechaNacimiento: {
              $lt: 20100101,
            },
          },
        },
      },
    };
    console.log("ProofRequest created");
    const scope = request.body.scope ?? [];
    request.body.scope = [...scope, proofRequest];
  }

  if (caseOfUse === "tarjetaCredito2") {
    console.log("Caso crear cuenta mayor de 12 años");
    //Credit card Saldo
    const proofRequest = {
      id: idRequest, // request id
      circuit_id: "credentialAtomicQuerySig",
      rules: {
        query: {
          allowedIssuers: ["*"], // ID of the trusted issuers
          schema: {
            type: "ScoreCredito",
            url: "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/f1eba654-f5c1-491c-a108-06d9f54d9fa0.json-ld",
          },
          req: {
            score: {
              $gt: 200,
            },
          },
        },
      },
    };
    console.log("ProofRequest created");
    const scope = request.body.scope ?? [];
    request.body.scope = [...scope, proofRequest];
  }
  if (caseOfUse === "fondoInversion") {
    console.log("Caso cuenta de ahorros saldo mayor a 50.000.000");
    //Credit card Saldo
    const proofRequest = {
      id: idRequest, // request id
      circuit_id: "credentialAtomicQuerySig",
      rules: {
        query: {
          allowedIssuers: ["*"], // ID of the trusted issuers
          schema: {
            type: "CuentaBancaria",
            url: "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/fa68dca0-38ef-4451-8bed-379a5e65d087.json-ld",
          },
          req: {
            saldo: {
              $gt: 1000000,
            },
          },
        },
      },
    };
    console.log("ProofRequest created");
    const scope = request.body.scope ?? [];
    request.body.scope = [...scope, proofRequest];
  }

  /*const proofRequest  = {
		id: 1, // request id
		circuit_id: 'credentialAtomicQuerySig',
		rules: {
			query: {
			allowedIssuers: ['*'], // ID of the trusted issuer
			schema: {
				type: 'PolygonDAOMember',
				url: 'https://schema.polygonid.com/jsonld/dao.json-ld',
			}
			},
			req: {
				role: {
				  $eq: 1, // the role must be 1
				},
			  },
		},
		};
	
	console.log('ProofRequest created');
	const scope = request.body.scope ?? [];
	request.body.scope = [...scope, proofRequest];*/

  //Credit card
  /*const proofRequest = {
		id: 1, // request id
		circuit_id: 'credentialAtomicQuerySig',
		rules: {
			query: {
			allowedIssuers: ['*'],
			schema: {
				type: 'EmployeeData',
				url: 'https://schema.com/...employeedata',
			},
			req: {
				monthlySalary: {
				$gt: 1000, // monthlySalary must be over $1000
				},
			},
			},
		},
		};
	const scope = request.body.scope ?? [];
	request.body.scope = [...scope, proofRequest];*/

  // Store auth request in map associated with session ID
  requestMap.set(`${sessionId}`, request);
  console.log(res);
  console.log(request);

  return res.status(200).set("Content-Type", "application/json").send(request);
}

// Callback verifies the proof after sign-in callbacks
async function Callback(req, res) {
  const user = User.upsert({
    id: idRequest,
    state: 2,
  });
  // Get session ID from request
  const sessionId = req.query.sessionId;

  // get JWZ token params from the post request
  const raw = await getRawBody(req);
  const tokenStr = raw.toString().trim();

  // fetch authRequest from sessionID
  const authRequest = requestMap.get(`${sessionId}`);

  // Locate the directory that contains circuit's verification keys
  const verificationKeyloader = new loaders.FSKeyLoader("./keys");
  const sLoader = new loaders.UniversalSchemaLoader("ipfs.io");

  console.log("Done");

  // Add Polygon Mumbai RPC node endpoint - needed to read on-chain state and identity state contract address
  const ethStateResolver = new resolver.EthStateResolver(
    "https://polygon-mumbai.g.alchemy.com/v2/NEJA3Eag1uULw6Gdq7b6f2Fe9Nk5G_mE",
    "0x251dcd7De5f5c8dc0b83F356970F49346692447B"
  );

  console.log("Done ethStateResolver");
  console.log(ethStateResolver);

  // EXECUTE VERIFICATION
  const verifier = new auth.Verifier(
    verificationKeyloader,
    sLoader,
    ethStateResolver
  );

  try {
    authResponse = await verifier.fullVerify(tokenStr, authRequest);
    console.log("Done FullVerify");
    const user = User.upsert({
      id: idRequest,
      state: 4,
    });
  } catch (error) {
    console.log(error);
    console.log("Error 500");
    const user = User.upsert({
      id: idRequest,
      state: 3,
    });
    return res.status(500).send(error);
  }
  return res
    .status(200)
    .set("Content-Type", "application/json")
    .send("user with ID: " + authResponse.from + " Succesfully authenticated");
}

function createId() {
  var date = new Date();
  var id =
    "" +
    date.getFullYear() +
    date.getMonth() +
    date.getDay() +
    date.getHours() +
    date.getMinutes() +
    date.getSeconds() +
    (Math.floor(Math.random() * (9999 - 1000)) + 1000);
  id = parseInt(id);
  return id;
}
