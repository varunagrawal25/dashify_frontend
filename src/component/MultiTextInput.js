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