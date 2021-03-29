import React from 'react'

class Row extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log("this.props.id = " + this.props.id)
    console.log("this.props.rowData = " + JSON.stringify(this.props.rowData))
    console.log("this.props.rowData.question_text = " + this.props.rowData.question_text)
  }

  render() {

{/*
    const cells = Object.keys(this.props.rowData).map((key, index) => {
          return (
            <td>{this.props.rowData[key]}</td>
          )
    })
*/}

  const cells = (
    <div>
      <td>{this.props.rowData.question_text}</td>
      <td>{this.props.rowData.answer_text}</td>
      <td>{this.props.rowData.image_location}</td>
      <td>{this.props.rowData.category}</td>
      <td>{this.props.rowData.difficulty}</td>
    </div>
  )

    return (
      <tr>
        {cells}
      </tr>
    )
  }
}

export default Row
