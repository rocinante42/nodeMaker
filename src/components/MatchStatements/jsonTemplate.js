export const jsonTemplate = {
  setup: {
    display: "JaxGrid",
    grid_columns: 2,
    jaxAnswerType: "layout",
    input_type: "optionOk"
  },
  answer: {
    random: []
  }
}

export const titleTemplate =
  {
    "i": "title1",
    "x": 0,
    "y": 0,
    "h": 1,
    "w": 1,
    "static": true,
    "jaxDisplay": {
      "jaxType": "ascii",
      "jaxContent": [
        {
          "type": "text",
          "content": "Example of Commutative Property"
        }
      ]
    }
  }


export const questionTemplate = {
  "i": "quest1",
  "x": 1,
  "y": 0,
  "h": 1,
  "w": 1,
  "static": false,
  "jaxDisplay": {
    "jaxType": "ascii",
    "jaxContent": [
      {
        "type": "math",
        "content": "(x+4)+7=x+(4+7)"
      }
    ]
  }
}

export default jsonTemplate;