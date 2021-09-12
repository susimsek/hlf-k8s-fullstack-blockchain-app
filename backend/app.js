const express = require("express");
const app = express();
var morgan = require('morgan')
app.use(morgan('combined'))
const bodyparser = require("body-parser");
const { registerUser, userExist } = require("./registerUser");
const {createAsset,TransferAsset,updateAsset,deleteAsset} =require('./tx')
const {GetAllAssets,GetAssetHistory} =require('./query')

/**
 * @swagger
 * definitions:
 *   Asset:
 *     type: object
 *     properties:
 *       org:
 *         type: string
 *       userId:
 *         type: string
 *       data:
 *         type: object
 *         properties:
 *           ID:
 *             type: string
 *           owner:
 *             type: string
 *           color:
 *             type: string
 *           size:
 *             type: integer
 *           appraisedValue:
 *             type: integer
 */

/**
 * @swagger
 * definitions:
 *   Assets:
 *     type: array
 *     items:
 *       type: object
 *       properties:
 *         Key:
 *           type: string
 *         Record:
 *           type: object
 *           properties:
 *             ID:
 *               type: string
 *             owner:
 *               type: string
 *             color:
 *               type: string
 *             size:
 *               type: integer
 *             appraisedValue:
 *               type: integer
 */

/**
 * @swagger
 * definitions:
 *   AssetHistory:
 *     type: array
 *     items:
 *       type: object
 *       properties:
 *         record:
 *           type: object
 *           properties:
 *             ID:
 *               type: string
 *             owner:
 *               type: string
 *             color:
 *               type: string
 *             size:
 *               type: integer
 *             appraisedValue:
 *               type: integer
 *         txId:
 *           type: string
 *         timestamp:
 *           type: string
 *           format: date-time
 *         isDelete:
 *           type: boolean
 */

/**
 * @swagger
 * definitions:
 *   AssetDeleteRequest:
 *     type: object
 *     properties:
 *       org:
 *         type: string
 *       userId:
 *         type: string
 *       data:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 */

/**
 * @swagger
 * definitions:
 *   AssetTransferRequest:
 *     type: object
 *     properties:
 *       org:
 *         type: string
 *       userId:
 *         type: string
 *       data:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           newOwner:
 *             type: string
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       org:
 *         type: string
 *       userId:
 *         type: string
 */

// chaincode adı
const chaincodeName = "basic";

// channel adı
const channelName = "mychannel"

// update,delete,create işlemleri transaction oluyor.

var cors = require('cors')
app.use(cors())
app.use(bodyparser.json());

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Asset Transfer Rest API",
            description: "Blockchain based Asset Transfer Rest API",
            contact: {
                name: "Şuayb Şimşek"
            },
            servers: ["http://api.hlf-k8.tk"]
        }
    },
    // ['.routes/*.js']
    apis: ["app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(4000, () => {
    console.log("server started");

})

app.get('/health',(req,res)=> {
    res.json({ status: 'UP' })
});

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Users
 *     description: Register a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully registered
 */
app.post("/register", async (req, res) => {

    try {
        let org = req.body.org;
        let userId = req.body.userId;
        let result = await registerUser({ OrgMSP: org, userId: userId });
        res.send(result);

    } catch (error) {
        res.status(500).send(error)
    }
});


/**
 * @swagger
 * /createAsset:
 *   post:
 *     tags:
 *       - Assets
 *     description: Create a new asset
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: asset
 *         description: Asset object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Asset'
 *     responses:
 *       200:
 *         description: Successfully created
 */
app.post("/createAsset", async (req, res) => {
    try {


        let payload = {
            "org": req.body.org,
            "channelName": channelName,
            "chaincodeName": chaincodeName,
            "userId": req.body.userId,
            "data": req.body.data
        }

        let result = await createAsset(payload);
        res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
})



/**
 * @swagger
 * /updateAsset:
 *   post:
 *     tags:
 *       - Assets
 *     description: Update a single asset
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: asset
 *         description: Asset object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Asset'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
app.post("/updateAsset", async (req, res) => {
    try {


        let payload = {
            "org": req.body.org,
            "channelName": channelName,
            "chaincodeName": chaincodeName,
            "userId": req.body.userId,
            "data": req.body.data
        }

        let result = await updateAsset(payload);
        res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
})


app.post("/transferAsset", async (req, res) => {

    try {

        let payload = {
            "org": req.body.org,
            "channelName": channelName,
            "chaincodeName": chaincodeName,
            "userId": req.body.userId,
            "data": req.body.data
        }

        let result = await TransferAsset(payload);
        res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
})

/**
 * @swagger
 * /deleteAsset:
 *   post:
 *     tags:
 *       - Assets
 *     description: Delete a single asset
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: asset
 *         description: Asset delete object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/AssetDeleteRequest'
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
app.post("/deleteAsset", async (req, res) => {
    try {
        let payload = {
            "org": req.body.org,
            "channelName": channelName,
            "chaincodeName": chaincodeName,
            "userId": req.body.userId,
            "data": req.body.data
        }

        let result = await deleteAsset(payload);
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error)
    }
})



/**
 * @swagger
 * /getAllAssets:
 *   get:
 *     tags:
 *       - Assets
 *     description: Returns all assets
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: org
 *         description: Organization ID
 *         in: query
 *         required: true
 *         type: string
 *       - name: userId
 *         description: User ID
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description:  An array of assets
 *         schema:
 *           $ref: '#/definitions/Assets'
 */
// tüm asset listesini getirir.
app.get('/getAllAssets', async (req, res) => {
    try {


        let payload = {
            "org": req.query.org,
            "channelName": channelName,
            "chaincodeName": chaincodeName,
            "userId": req.query.userId
        }

        let result = await GetAllAssets(payload);
        res.json(result)
    } catch (error) {
        res.send(error)
    }
});

/**
 * @swagger
 * /getAssetHistory:
 *   get:
 *     tags:
 *       - Assets
 *     description: Returns a single asset history
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: org
 *         description: Organization ID
 *         in: query
 *         required: true
 *         type: string
 *       - name: userId
 *         description: User ID
 *         in: query
 *         required: true
 *         type: string
 *       - name: id
 *         description: Asset ID
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of asset history
 *         schema:
 *           $ref: '#/definitions/AssetHistory'
 */
// sadece bir asseti getirir.
app.get('/getAssetHistory', async (req, res) => {
    try {
        let payload = {
            "org": req.query.org,
            "channelName": channelName,
            "chaincodeName": chaincodeName,
            "userId": req.query.userId,
            "data": {
                id: req.query.id
            }
        }

        let result = await GetAssetHistory(payload);
        res.json(result)
    } catch (error) {
        res.status(500).send(error)
    }

});


