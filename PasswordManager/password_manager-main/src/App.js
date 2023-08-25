import {Component} from 'react'

import './App.css'

import {v4 as uuidv4} from 'uuid'

const colorList = ['yellow', 'green', 'blue', 'brown', 'red']

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordList: [],
    isTrue: false,
    isShow: false,
    searchInput: '',
  }

  addPasswordsToList = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const color = colorList[Math.floor(Math.random() * 5)]
    const newList = {
      id: uuidv4(),
      Website: website,
      UserName: username,
      Password: password,
      InitialLetter: initial,
      InitialColor: color,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newList],
      website: '',
      password: '',
      username: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  onClickShowPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onDeletePassword = id => {
    const {passwordList} = this.state
    const newList = passwordList.filter(eachItem => eachItem.id !== id)
    const caseof = newList.length !== 0
    this.setState({passwordList: newList, isTrue: caseof})
  }

  render() {
    const {
      website,
      username,
      password,
      passwordList,
      searchInput,
      isShow,
    } = this.state
    let {isTrue} = this.state
    const newList = passwordList.filter(eachItem =>
      eachItem.Website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="card-1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="sm-image"
          />
          <form className="form-container" onSubmit={this.addPasswordsToList}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-images"
              />
              <input
                type="text"
                className="input-field"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                value={website}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-images"
              />
              <input
                type="text"
                className="input-field"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-images"
              />
              <input
                type="password"
                className="input-field"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button className="form-button" type="submit">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="lg-image"
          />
        </div>
        <div className="card-2">
          <div className="passwords-length-contianer">
            <div className="no-passwords">
              <h1 className="password-length-heading">Your Passwords</h1>
              <p className="password-length">{newList.length}</p>
            </div>
            <div className="input-container-1">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                alt="search"
                className="input-images"
              />
              <input
                type="search"
                className="input-field"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="show-password">
            <input
              type="checkbox"
              id="check"
              className="checkbox"
              onChange={this.onClickShowPassword}
            />
            <label htmlFor="check" className="check-box-label">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-image"
              />
              <p className="no-password-label">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="passwords-showing-container">
              {newList.map(eachValue => (
                <li
                  className="each-password"
                  id={eachValue.id}
                  key={eachValue.id}
                >
                  <p className={`letter-logo ${eachValue.InitialColor}`}>
                    {eachValue.InitialLetter}
                  </p>
                  <div className="details-container">
                    <p className="website">{eachValue.Website}</p>
                    <p className="website">{eachValue.UserName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars"
                      />
                    )}
                    {isShow && <p className="password">{eachValue.Password}</p>}
                  </div>
                  <button
                    type="button"
                    className="button"
                    onClick={() => this.onDeletePassword(eachValue.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
