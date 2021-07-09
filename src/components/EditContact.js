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

  componentDidMount() {
    console.log(this.props.contacts);
    let contact = this.props.contacts.find(
      (contact) => contact.id === parseInt(this.props.match.params.id, 10)
    );
    this.setState({
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone
    });
    console.log('state changed', this.state);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleDelete(name, lastName) {
    if (
      window.confirm(`Are you sure you want to delete ${name} ${lastName}?`)
    ) {
      this.props.delete(this.state.id);
    }
  }

  render() {
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
              placeholder={this.state.first_name}
            />

            <input
              name='last_name'
              type='text'
              onChange={this.handleChange}
              value={this.state.last_name}
              placeholder={this.state.last_name}
            />

            <input
              name='email'
              type='text'
              onChange={this.handleChange}
              value={this.state.email}
              placeholder={this.state.email}
            />

            <input
              name='phone'
              type='text'
              onChange={this.handleChange}
              value={this.state.phone}
              placeholder={this.state.phone}
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
                onClick={() => {
                  if (
                    this.state.first_name === '' ||
                    this.state.last_name === '' ||
                    this.state.email === '' ||
                    this.state.phone === ''
                  ) {
                    alert('Entries are not allowed to be empty.');
                  } else {
                    this.props.update(this.state);
                  }
                }}
              >
                <SaveIcon width={15} />
              </div>
            </Link>
          </Tooltip>
          <Tooltip title='Delete Contact' arrow>
            <div
              className='form-button'
              onClick={() =>
                this.handleDelete(this.state.first_name, this.state.last_name)
              }
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
