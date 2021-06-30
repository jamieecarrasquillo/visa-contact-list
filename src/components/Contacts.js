import React from 'react';
import { connect } from 'react-redux';
import { removeContact } from './../store/contacts';
import { Contact } from './Contact';
import './styling/contacts.css';

export class Contacts extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchFilter !== prevProps.searchFilter) {
    }
  }

  render() {
    return (
      <div className='all-contact-container'>
        <div className='contact-container'>
          {this.props.contacts
            .filter((contact) => {
              if (!this.props.searchFilter) return true;
              let fullName =
                `${contact.first_name}${contact.last_name}`.toLowerCase();
              return fullName.includes(this.props.searchFilter.toLowerCase());
            })
            .map((contact, index) => {
              return (
                <Contact
                  index={index}
                  id={contact.id}
                  name={contact.first_name}
                  lastName={contact.last_name}
                  phone={contact.phone}
                  image={contact.image}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    searchFilter: state.searchFilter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delete: (contact) => dispatch(removeContact(contact))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
