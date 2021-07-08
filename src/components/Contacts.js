import React from 'react';
import { connect } from 'react-redux';
import { removeContact } from './../store/contacts';
import Contact from './Contact';
import './styling/contacts.css';

const sort = (arr, willSort) => {
  if (willSort) {
    const newArr = [...arr];
    return newArr.sort((a, b) => {
      let aName = a.first_name.toLowerCase();
      let bName = b.first_name.toLowerCase();

      if (aName > bName) {
        return 1;
      }
      if (aName < bName) {
        return -1;
      }
      return 0;
    });
  } else {
    return arr;
  }
};

export class Contacts extends React.Component {
  render() {
    return (
      <div className='all-contact-container'>
        <div className='contact-container'>
          {sort(this.props.contacts, this.props.sort)
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
                  color={contact.color ? contact.color : ''}
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
    searchFilter: state.searchFilter,
    sort: state.sort
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delete: (contact) => dispatch(removeContact(contact))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
