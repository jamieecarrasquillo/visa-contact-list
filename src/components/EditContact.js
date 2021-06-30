import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateContact, removeContact } from './../store/contacts';
import SaveIcon from './icons/SaveIcon';
import DeleteIcon from './icons/DeleteIcon';
import GoBackIcon from './icons/GoBackIcon';
import { Tooltip } from '@material-ui/core';
import './styling/edit-contact.css';

export class EditContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: parseInt(this.props.match.params.id, 10),
      first_name: '',
      last_name: '',
      email: '',
      phone: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Edit submitted' + this.state);
  }

  handleDelete(name, lastName) {
    if (
      window.confirm(`Are you sure you want to delete ${name} ${lastName}?`)
    ) {
      this.props.delete(this.state.id);
    }
  }

  render() {
    let selectedContact = this.props.contacts.filter((contact) => {
      return contact.id === this.state.id;
    });
    let firstName = selectedContact[0].first_name;
    let lastName = selectedContact[0].last_name;
    let email = selectedContact[0].email;
    let phone = selectedContact[0].phone;

    return (
      <div className='edit-contact-container'>
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
              placeholder={firstName}
            />

            <input
              name='last_name'
              type='text'
              onChange={this.handleChange}
              value={this.state.last_name}
              placeholder={lastName}
            />

            <input
              name='email'
              type='text'
              onChange={this.handleChange}
              value={this.state.email}
              placeholder={email}
            />

            <input
              name='phone'
              type='text'
              onChange={this.handleChange}
              value={this.state.phone}
              placeholder={phone}
            />
          </div>
        </form>
        <div className='button-container'>
          <Tooltip title='Go Back' arrow>
            <Link className='form-button' to='/'>
              <GoBackIcon width={15} />
            </Link>
          </Tooltip>
          <Tooltip title='Save Changes' arrow>
            <Link to='/'>
              <div
                className='form-button'
                type='submit'
                onClick={() => this.props.update(this.state)}
              >
                <SaveIcon width={15} />
              </div>
            </Link>
          </Tooltip>
          <Tooltip title='Delete Contact' arrow>
            <div
              className='form-button'
              onClick={() => this.handleDelete(firstName, lastName)}
            >
              <DeleteIcon width={15} />
            </div>
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
    update: (contact) => dispatch(updateContact(contact)),
    delete: (contact) => dispatch(removeContact(contact))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
