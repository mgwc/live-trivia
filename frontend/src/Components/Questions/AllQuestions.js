import React from "react"
import axios from 'axios'
import QuestionTable from "./QuestionTable"
import DeletionModal from "./DeletionModal"
import AddQuestionModal from "./AddQuestionModal"
import AddGameQuestionModal from "./AddGameQuestionModal"
import EditQuestionModal from "./EditQuestionModal"
import TableNav from "./../TableNav"
import path from '../../req'

class AllQuestions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      pageNumber: 1,
      questions: [],
      showDeleteModal: false,
      showDeleteModalSuccessMessage: false,
      selectedGame: props.match.params.gameId,
      selectedQuestion: null,
      showAddModal: false,
      showAddModalSuccessMessage: false,
      showAddToGameModal: false,
      showAddToGameModalSuccessMessage: false,
      showEditModal: false,
      showEditModalSuccessMessage: false
    }

    this.getQuestions = this.getQuestions.bind(this)
    this.showDeleteModal = this.showDeleteModal.bind(this)
    this.hideDeleteModal = this.hideDeleteModal.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
    this.showEditModal = this.showEditModal.bind(this)
    this.submitNewQuestion = this.submitNewQuestion.bind(this)
    this.showAddToGameModal = this.showAddToGameModal.bind(this)
    this.handleAddToGameSubmit = this.handleAddToGameSubmit.bind(this)
    this.addQuestionToGame = this.addQuestionToGame.bind(this)
    this.handlePaging = this.handlePaging.bind(this)
  }

  componentDidMount() {
    this.getQuestions()
  }

  componentWillUnmount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pageNumber != this.state.pageNumber) {
      this.getQuestions()
    }
  }

  getQuestions = () => {
    console.log("getQuestions() invoked")
    this.setState({loading: true})
    axios.get(`${path()}/questions/${this.state.pageNumber}`)
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
    this.setState({selectedQuestion: question, showDeleteModal: true}, () => {
      console.log("this.state.selectedQuestion after setting state = " +
      this.state.selectedQuestion)
    })
  }

  hideDeleteModal = () => {
    console.log("Hiding deletion modal")
    this.setState({selectedQuestion: null, showDeleteModal: false}, () => {
      console.log("this.state.showModal = " + this.state.showDeleteModal)
    })
  }

  deleteQuestion = () => {
    console.log("deleteQuestion() in AllQuestions invoked")

    if (this.state.selectedQuestion) {
      console.log("deleteQuestion() called in AllQuestions; selectedQuestion = " + this.state.selectedQuestion.questionText)
    } else {
      console.log("deleteQuestion() called in AllQuestions, but selectedQuestion is falsy")
    }

    console.log("Calling axios.delete()")
    axios.delete(`${path()}/questions/delete/${this.state.selectedQuestion.id}`)
      .then(res => {
        console.log("Delete response = " + res.data)

        this.setState({
          showDeleteModalSuccessMessage: true,
        })
        console.log("this.state.showDeleteModalSuccessMessage = " + this.state.showDeleteModalSuccessMessage)

        let hideModal = setTimeout(function() {
          this.setState({
            showDeleteModal: false,
            showDeleteModalSuccessMessage: false,
            selectedQuestion: null
            })
        }.bind(this), 2000)
        this.getQuestions()
      })
      .catch(function (error) {
        console.log(error)
      })
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
       // if successful, show success message, then close modal
        this.setState({showAddModalSuccessMessage: true})
        let hideModal = setTimeout(function() {
          this.setState({
            showAddModal: false,
            showAddModalSuccessMessage: false})
        }.bind(this), 700)
        this.getQuestions()
      })
      .catch(function (error) {
        console.log(error)
        // if unsuccessful, keep addModal open and display failure message
      })
  }

  hideAddModal = () => {
    console.log("Hiding add-question modal")
    this.setState({showAddModal: false})
  }

  /*
    Add question to game(s) functionality
  */
  showAddToGameModal = (question) => {
    this.setState(prevState => {
      return {
        selectedQuestion: prevState.showEditModal ? null : question,
        showAddToGameModal: !prevState.showAddToGameModal
      }
    }, () => {
      console.log("showAddToGameModal called; showAddToGameModal = " + this.state.showAddToGameModal)
    })
  }

  handleAddToGameSubmit = (formState) => {
    console.log("Form data = ")
    Object.keys(formState).forEach(function(key) {
      console.log('' + key + ": " + formState[key])
    })

    let formStateJson = {"gameId": "" + formState.selectedGame}
    this.addQuestionToGame(formStateJson)
  }

  addQuestionToGame = (gameObject) => {
    gameObject["questionId"] = "" + this.state.selectedQuestion.id
    console.log("In addQuestionToGame; gameObject = " + JSON.stringify(gameObject))
    axios.post(`${path()}/games/add-question`, gameObject)
    .then(res => {
      console.log("response to add-to-game POST: " + res.data)
      this.setState({showAddToGameModalSuccessMessage: true})
      let hideModal = setTimeout(function() {
        this.setState({
          showAddToGameModal: false,
          showAddToGameModalSuccessMessage: false})
        }.bind(this), 700)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  /*
    Edit question functionality
  */
  showEditModal = (question) => {
    this.setState(prevState => {
      return {
        selectedQuestion: prevState.showEditModal ? null : question,
        showEditModal: !prevState.showEditModal
      }
    })

    console.log("showEditModal toggled; showEditModal = " + this.state.showEditModal +
      ", selectedQuestion = " + this.state.selectedQuestion)
  }

  handleEditSubmit = (formState) => {
    console.log("Form data = ")
    Object.keys(formState).forEach(function(key) {
      console.log('' + key + ": " + formState[key])
    })

    console.log("Submitting form for question " + this.state.selectedQuestion.questionText)

    axios.put(`${path()}/questions/edit/${this.state.selectedQuestion.id}`, formState)
      .then(res => {
        console.log("response to question PUT: " + res.data)
       // if successful, show success message, then close modal
        this.setState({showEditModalSuccessMessage: true})
        let hideModal = setTimeout(function() {
          this.setState({
            showEditModal: false,
            showEditModalSuccessMessage: false,
            selectedQuestion: null})
        }.bind(this), 700)
        this.getQuestions()
      })
      .catch(function (error) {
        console.log(error)
        // if unsuccessful, keep addModal open and display failure message
      })
  }

  /*

  Question page navigation

  */

  handlePaging = (event) => {

    this.setState(prevState => {
      let newPageNumber = prevState.pageNumber
      if (event.target.className === 'pagination-previous') {
        console.log('Registered click on previous button')
        newPageNumber--
      }  else {
        console.log("Registered click on next button")
        newPageNumber++
      }

      console.log("Current page = " + newPageNumber)

      return {
        pageNumber: newPageNumber
      }
    })
  }

  /*

  Rendering

  */

  render() {

    console.log("Rendering AllQuestions, with this.state.showAddModal = " + this.state.showAddModal
                + ", showDeleteModal = " + this.state.showDeleteModal +
                ", showEditModal = " + this.state.showEditModal +
                ", selectedQuestion = " + this.state.selectedQuestion +
                ", selectedGame = " + this.state.selectedGame +
                ", this.match.gameId = " + this.props.match.params.gameId)

    const tableHeadings = ["Question", "Answer", "Image", "Category", "Difficulty", " ", " "]
    const table = this.state.loading ? <p>"Loading"</p> :
      <QuestionTable
        headings={tableHeadings}
        rows={this.state.questions}
        showDeleteModal={this.showDeleteModal}
        handleEditClick={this.showEditModal}
        showAddToGameModal={this.showAddToGameModal}
      />

    return (
      <div>
        <button onClick={this.showAddModal}>Add question</button>
        <AddGameQuestionModal data={this.state} hideModal={this.showAddToGameModal} handleSubmit={this.handleAddToGameSubmit} gameId={this.state.selectedGame} />
        <AddQuestionModal data={this.state} hideModal={this.hideAddModal} handleSubmit={this.submitNewQuestion} />
        <DeletionModal data={this.state} hideModal={this.hideDeleteModal} deleteQuestion={this.deleteQuestion} />
        <EditQuestionModal data={this.state} showEditModal={this.showEditModal} handleSubmit={this.handleEditSubmit}
          initialQuestionText=""/>
        <TableNav handlePaging={this.handlePaging} />
        {table}
      </div>
    )
  }
}

export default AllQuestions;
