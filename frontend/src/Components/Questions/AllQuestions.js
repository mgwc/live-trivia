import React from "react"
import axios from 'axios'
import Table from "../Generic/Table"
import path from '../../req'

// const api = axios.create({
//   baseURL:
// })

class AllQuestions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      questions: []
    }
  }

  componentDidMount() {
    this.setState({loading: true})
    axios.get(`${path()}/questions/`)
      .then(res => {
        const questionData = res.data
        this.setState({
          questions: questionData,
          loading: false
        })
        console.log(questionData)
      })
  }

  componentWillUnmount() {
  }

  render() {

    const headings = ["Question", "Answer", "Image", "Category", "Difficulty"]
    const table = this.state.loading ? <p>"Loading"</p> :
      <Table headings={headings} rows={this.state.questions} rowType={'question'} />

    return (
      <div>
        {table}
      </div>
    )
  }
}

export default AllQuestions;
