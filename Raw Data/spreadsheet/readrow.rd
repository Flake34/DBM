{
  "name": "readrow",
  "permissions": "NONE",
  "restriction": "1",
  "_id": "kaksc",
  "actions": [
    {
      "behavior": "1",
      "interpretation": "1",
      "code": "var JSONtext = {};\nJSONtext.row = parseInt(msg.content.split(\" \").slice(1).join(\" \"));\nJSONtext.method = \"read\";\nvar url = \"\";\nconst fetch = require('node-fetch');\nfetch(url, {method: 'POST', body: JSON.stringify(JSONtext)})\n  .then(res => res.json())\n  .then(json => {\n    msg.channel.send(\"Response:\\n```json\\n\"+json.data+\"\\n```\");\n  });",
      "storage": "0",
      "varName": "",
      "name": "Run Script"
    }
  ]
}