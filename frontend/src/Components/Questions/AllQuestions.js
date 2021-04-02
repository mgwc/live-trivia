import React from "react"
import axios from 'axios'
import QuestionTable from "./QuestionTable"
import DeletionModal from "./DeletionModal"
import AddQuestionModal from "./AddQuestionModal"
import path from '../../req'

// const api = axios.create({
//   baseURL:
// })

class AllQuestions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      questions: [],
      showDeleteModal: false,
      questionForDeletion: null,
      showAddModal: false,
    }

    this.getQuestions = this.getQuestions.bind(this)
    this.showDeleteModal = this.showDeleteModal.bind(this)
    this.hideDeleteModal = this.hideDeleteModal.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
    this.submitNewQuestion = this.submitNewQuestion.bind(this)
  }

  componentDidMount() {
    this.getQuestions()
  }

  componentWillUnmount() {
  }

  getQuestions = () => {
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

  /*

    Delete-question functionality

   */

  showDeleteModal = (question) => {
    console.log("showDeleteModal invoked in AllQuestions; question param = " + JSON.stringify(question))
    console.log("question.id = " + question.id)
    this.setState({questionForDeletion: question.id, showDeleteModal: true}, () => {
      console.log("this.state.questionForDeletion after setting state = " + this.state.questionForDeletion)
    })
  }

  hideDeleteModal = () => {
    console.log("Hiding deletion modal")
    this.setState({questionForDeletion: null, showDeleteModal: false}, () => {
      console.log("this.state.showModal = " + this.state.showDeleteModal)
    })
  }

  deleteQuestion = () => {
    console.log("deleteQuestion() in AllQuestions invoked")

    if (this.state.questionForDeletion) {
      console.log("deleteQuestion() called in AllQuestions; questionForDeletion = " + this.state.questionForDeletion)
    } else {
      console.log("deleteQuestion() called in AllQuestions, but questionForDeletion is falsy: " + this.state.questionForDeletion)
    }

    this.setState({questionForDeletion: null, showDeleteModal: false,})

    console.log("Calling axios.delete()")
    axios.delete(`${path()}/questions/delete/${this.state.questionForDeletion}`)
      .then(res => {
        console.log("Delete response = " + res.data)
      }).then(this.getQuestions())
  }

  /*

  Add-question functionality

  */

  showAddModal = () => {
    console.log("Showing add-question modal")
    this.setState({showAddModal: true})
  }

  submitNewQuestion = (formState) => {
    console.log("Form data = ")
    Object.keys(formState).forEach(function(key) {
      console.log('' + key + ": " + formState[key])
    })

    axios.post(`${path()}/questions/add`, formState)
      .then(res => {
        console.log("response to question POST: " + res.data)
       // if successful, close addModal and display success message
       // if unsuccessful, keep addModal open and display failure message
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  hideAddModal = () => {
    console.log("Hiding add-question modal")
    this.setState({showAddModal: false})
  }

  /*

  Rendering

  */

  render() {

    console.log("Rendering AllQuestions, with this.state.showAddModal = " + this.state.showAddModal)

    const deleteQuestionModal = this.state.showDeleteModal ?
              <DeletionModal
                showModal={this.state.showDeleteModal}
                hideModal={this.hideDeleteModal}
                deleteQuestion={this.deleteQuestion}
                question={this.state.questionForDeletion}
              />
              : null

    const addQuestionModal = this.state.showAddModal ?
              <AddQuestionModal
                showModal={this.state.showAddModal}
                hideModal={this.hideAddModal}
                handleSubmit={this.submitNewQuestion}
              />
              : null

    const tableHeadings = ["Question", "Answer", "Image", "Category", "Difficulty", " ", " "]
    const table = this.state.loading ? <p>"Loading"</p> :
      <QuestionTable
        headings={tableHeadings}
        rows={this.state.questions}
        showDeleteModal={this.showDeleteModal}
      />

    return (
      <div>
        <button onClick={this.showAddModal}>Add question</button>
        {addQuestionModal}
        {deleteQuestionModal}
        {table}
      </div>
    )
  }
}

export default AllQuestions;
