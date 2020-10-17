export const email_regex = data => {
  const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
  const result = pattern.test(data);
  //   if (result === false) {
  //     this.setState({
  //       ownerEmail_error: "Not a valid email"
  //     });
  //     error_present = true;
  //   }

  return result;
};

export const url_regex = data => {
  var result = data.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  //   if (result == null) {
  //     this.setState({
  //       instagramProfile_error: "Not a valid url"
  //     });
  //     error_present = true;
  //   }

  return result;
};

export const phone_regex = data => {
  const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  //validate('1234567890')     // true
  //validate(1234567890)       // true
  //validate('(078)789-8908')  // true
  //validate('123-345-3456')   // true

  return regex.test(data);
};

export const zipcode_regex = data => {
  const regex = /^\d{5}$|^\d{5}-\d{4}$/;

  //   if (result == null) {
  //     this.setState({
  //       instagramProfile_error: "Not a valid url"
  //     });
  //     error_present = true;
  //   }

  //validate('474001')     // true

  return regex.test(data);
};

export const password_regex = data => {
  var re = {
    capital: /[A-Z]/,
    digit: /[0-9]/,
    except: /[aeiou]/,
    full: /^[@#][A-Za-z0-9]{7,13}$/
  };

  // return (
  //   re.capital.test(data) &&
  //   re.digit.test(data) &&
  //   !re.except.test(data) &&
  //   re.full.test(data)
  // );

  if (!re.capital.test(data)) {
    return "Password must contain a Capital letter";
  } else if (!re.digit.test(data)) {
    return "Password must contain a digit";
  } else {
    return true;
  }
};
