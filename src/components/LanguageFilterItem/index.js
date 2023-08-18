// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageFilterDetails, isActive, setActiveLanguageFilterId} = props
  const {id, language} = languageFilterDetails
  const btnClassName = isActive ? 'button active-language-btn' : 'button'

  const onClickLanguageFilter = () => {
    setActiveLanguageFilterId(id)
  }

  return (
    <li className="language-list">
      <button
        type="button"
        className={btnClassName}
        onClick={onClickLanguageFilter}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
