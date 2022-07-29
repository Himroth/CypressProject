import 'dotenv/config'
import { defineConfig } from "cypress";
import { resolve } from "path";
const MongoClient = require('mongodb').MongoClient
const uri = process.env.MONGO_URI

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://icebev-interno-nonprod.ambevdevs.com.br/signature-control-panel",
    viewportWidth: 1200,
    viewportHeight: 1000,
    watchForFileChanges: false,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      on('task', {
        deleteRgs({ Rg1, Rg2, Rg3, Rg4, Rg5,
          Rg6, Rg7, Rg8, Rg9 }) {
          return new Promise((resolve) => {
            MongoClient.connect(`${uri}`, (err, client) => {
              if (err) {
                console.log(`MONGO CONNECTION ERROR: ${err}`)
                throw err;
              } else {
                const db = client.db('icebev');
                db.collection('signature_equipment_store').deleteMany({
                  rg: {
                    $in: [Rg1, Rg2, Rg3, Rg4, Rg5,
                      Rg6, Rg7, Rg8, Rg9]
                  }
                }, function (error, result) {
                  resolve({ success: result })
                  client.close();
                })
              }
            });
          }); // end of return Promise
        }
      }) // end of task
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results",
      overwrite: true,
      html: false,
      json: true,
      reportFilename: "[status]_[datetime]-[name]-report",
      timestamp: "longDate",
    },
    usuario: {
      usuario: "",
      dominio: "",
      senha: "",
    },
  }
})
