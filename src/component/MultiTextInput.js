import React, { Component } from "react";
export class InputTag extends React.Component {
    constructor() {
      super();
      
      this.state = {
        tags: [
          
        ]
      };

    
    
       
 
    
    }
    
    removeTag =async (i) => {
      const newTags = [ ...this.state.tags ];
      newTags.splice(i, 1);
      await this.setState({ tags: newTags });
      this.props.handler(this.state.tags)
    }
  
    inputKeyDown =async ( e) => {
      const val = e.target.value;
      if (e.key === 'Enter' && val) {
        if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
          return;
        }
       await this.setState({ tags: [...this.state.tags, val]});
        this.tagInput.value = null;
      } else if (e.key === 'Backspace' && !val) {
      await  this.removeTag(this.state.tags.length - 1);
      }
      this.props.handler(this.state.tags)
    }
   
  
    render() {
      const { tags } = this.state;
  
      return (
        <div className="input-tag">
          <ul className="input-tag__tags" style={{marginBottom:'10px'}}>
          <li className="input-tag__tags__input"><input type="text" onKeyDown={this.inputKeyDown} 
            ref={c => { this.tagInput = c; }} placeholder="Type Here And Press Enter To Add The Keyword,Click Submit To Start Tracking " /></li>
            </ul>
          <ul className="input-tag__tags">
            { tags.map((tag, i) => (
              <li key={tag}>
                {tag}
                <button type="button" onClick={() => { this.removeTag(i); }}>+</button>
              </li>
            ))}
            
          </ul>
          
        </div>
      );
    }
  }
  
  
  

// import * as React from 'react';
// import { ReactMultiEmail, isEmail } from 'react-multi-email';
// import 'react-multi-email/style.css';
 
// state{
//   emails: string[];
// }
// class Basic extends React.Component {
//   state = {
//     emails: [],
//   };
 
//   render() {
//     const { emails } = this.state;
 
//     return (
//       <>
//         <h3>Email</h3>
//         <ReactMultiEmail
//           placeholder="placeholder"
//           emails={emails}
//           onChange={(_emails: string[]) => {
//             this.setState({ emails: _emails });
//           }}
//           validateEmail={email => {
//             return isEmail(email); // return boolean
//           }}
//           getLabel={(
//             email: string,
//             index: number,
//             removeEmail: (index:this.state.id) => void,
//           ) => {
//             return (
//               <div data-tag key={index}>
//                 {email}
//                 <span data-tag-handle onClick={() => removeEmail(index)}>
//                   ×
//                 </span>
//               </div>
//             );
//           }}
//         />
//         <br />
//         <h4>react-multi-email value</h4>
//         <p>{emails.join(', ') || 'empty'}</p>
//       </>
//     );
//   }
// }
 
// export default Basic;