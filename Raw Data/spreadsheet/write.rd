{
  "name": "write",
  "permissions": "NONE",
  "restriction": "1",
  "_id": "zUtvu",
  "actions": [
    {
      "behavior": "1",
      "interpretation": "1",
      "code": "var JSONtext = {};\nJSONtext.method = \"write\";\nvar url = \"Web_App_URL\";\nconst fetch = require('node-fetch');\nfetch(url, {method: 'POST', body: JSON.stringify(JSONtext)})\n  .then(res => res.json())\n  .then(json => msg.channel.send(\"Response:\\n```json\\n\"+JSON.stringify(json)+\"\\n```\"));",
      "storage": "0",
      "varName": "",
      "name": "Run Script"
    }
  ]
}