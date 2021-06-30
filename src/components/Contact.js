import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeContact } from './../store/contacts';
import EditIcon from './icons/EditIcon';
import DeleteIcon from './icons/DeleteIcon';
import WhiteCurveIcon from './icons/WhiteCurveIcon';
import { Tooltip } from '@material-ui/core';
import './styling/contact.css';

export class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(contactId, name, lastName) {
    if (
      window.confirm(`Are you sure you want to delete ${name} ${lastName}?`)
    ) {
      this.props.delete(contactId);
    }
  }

  render() {
    return (
      <div
        className='single-contact-container'
        onMouseEnter={(e) => this.setState({ hover: true })}
        onMouseLeave={(e) => this.setState({ hover: false })}
        style={{
          backgroundColor: this.props.index % 2 === 0 ? '#ECC5E0' : '#F2D1D8'
        }}
        key={this.props.id}
      >
        <div
          className='single-contact-information-container'
          style={{
            transform: this.state.hover
              ? 'translate(0, -20px)'
              : 'translate(0, 0)'
          }}
        >
          <WhiteCurveIcon className='curve-icon' />
          <div className='contact-image-background'>
            <img className='contact-image' src={this.props.image} alt='' />
          </div>
          <div className='inner-single-contact-information'>
            <div className='contact-name'>
              {this.props.name} {this.props.lastName}
            </div>
            <div className='contact-phone'>{this.props.phone}</div>

            <div className='contact-buttons'>
              <Link to={`/contacts/edit/${this.props.id}`}>
                <Tooltip title='Edit' arrow>
                  <div
                    className='card-buttons edit'
                    style={{
                      transform: this.state.hover
                        ? 'translateY(0)'
                        : 'translateY(50px)'
                    }}
                  >
                    <EditIcon width={12} />
                  </div>
                </Tooltip>
              </Link>
              <Tooltip title='Delete' arrow>
                <div
                  className='card-buttons delete'
                  onClick={() => {
                    this.handleClick(
                      this.props.id,
                      this.props.name,
                      this.props.lastName
                    );
                  }}
                  style={{
                    transform: this.state.hover
                      ? 'translateY(0)'
                      : 'translateY(50px)'
                  }}
                >
                  <DeleteIcon width={12} />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    delete: (contact) => dispatch(removeContact(contact))
  };
};

export default connect(null, mapDispatchToProps)(Contact);
