import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithhubPopularRepos extends Component {
  state = {
    repositoryData: [],
    apiStatus: apiConstantStatus.initial,
    activeLanguageFilter: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageFilter} = this.state
    this.setState({apiStatus: apiConstantStatus.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilter}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachRepository => ({
        id: eachRepository.id,
        name: eachRepository.name,
        issueCount: eachRepository.issue_count,
        forksCount: eachRepository.forks_count,
        starsCount: eachRepository.stars_count,
        avatarUrl: eachRepository.avatar_url,
      }))
      this.setState({
        repositoryData: updatedData,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  renderRepositoryItem = () => {
    const {repositoryData} = this.state
    return (
      <ul className="repositories-list">
        {repositoryData.map(eachRepos => (
          <RepositoryItem repositoryDetails={eachRepos} key={eachRepos.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div>
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderRepositoryItem()
      case apiConstantStatus.failure:
        return this.renderFailureView()
      case apiConstantStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  setActiveLanguageFilterId = newFilterId => {
    this.setState({activeLanguageFilter: newFilterId}, this.getRepositories)
  }

  renderLanguageFilterList = () => {
    const {activeLanguageFilter} = this.state

    return (
      <ul className="language-filter-details">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            languageFilterDetails={eachItem}
            key={eachItem.id}
            isActive={eachItem.id === activeLanguageFilter}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        {this.renderLanguageFilterList()}
        {this.renderRepositoryItem()}
      </div>
    )
  }
}

export default GithhubPopularRepos
