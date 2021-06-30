import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addContact } from '../store/contacts';
import VisaBlackIcon from './icons/VisaBlackIcon';
import GoBackIcon from './icons/GoBackIcon';
import SaveIcon from './icons/SaveIcon';
import { Tooltip } from '@material-ui/core';
import './styling/new-contact-form.css';

export class NewContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.contacts.length + 1,
      first_name: '',
      last_name: '',
      email: '',
      phone: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className='new-contact-container'>
        <div className='company-logo'>
          <VisaBlackIcon />
        </div>
        <form className='contact-form' onSubmit={this.handleSubmit}>
          <div className='form-label'>
            <label>First Name</label>
            <label>Last Name</label>
            <label>Email Adress</label>
            <label>Phone Number</label>
          </div>
          <div className='form-placeholder'>
            <input
              name='first_name'
              type='text'
              onChange={this.handleChange}
              value={this.state.first_name}
            />

            <input
              name='last_name'
              type='text'
              onChange={this.handleChange}
              value={this.state.last_name}
            />

            <input
              name='email'
              type='text'
              onChange={this.handleChange}
              value={this.state.email}
            />

            <input
              name='phone'
              type='text'
              onChange={this.handleChange}
              value={this.state.phone}
            />
          </div>
        </form>
        <div className='button-container'>
          <Tooltip title='Go Back' arrow>
            <Link className='form-button' to='/'>
              <GoBackIcon width={15} />
            </Link>
          </Tooltip>

          <Tooltip title='Add Contact' arrow>
            <Link to='/'>
              <div
                className='form-button'
                onClick={() => this.props.add(this.state)}
              >
                <SaveIcon width={15} />
              </div>
            </Link>
          </Tooltip>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: (contact) => dispatch(addContact(contact))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewContactForm);
