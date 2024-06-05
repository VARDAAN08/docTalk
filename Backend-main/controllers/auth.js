const Patient = require("../models/user");
const Doctor = require("../models/doctor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
const path = require("path");

const patientRegister = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ email: req.body.email });
    if (patient) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    } else {
      bcrypt.hash(req.body.password, 10, async function (err, hashedPassword) {
        if (err) {
          res.status(400).json({
            status: "error",
            message: "Failed",
          });
        }

        let patient = new Patient({
          name: req.body.name,
          email: req.body.email,
          phn: req.body.phn,
          age: req.body.age,
          gender: req.body.gender,
          password: hashedPassword,
        });
        process.env.getName = patient.name;

        await patient.save();
      });
      res.status(200).json({
        status: "success",
        message: "Successfully registered Patient ",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      message: error,
    });
  }
};
const doctorRegister = async (req, res) => {
  try {
    console.log(req.files);
    console.log(req.body);
    const doctor = await Doctor.findOne({ email: req.body.email });
    if (doctor) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    } else {
      bcrypt.hash(req.body.password, 10, async function (err, hashedPassword) {
        if (err) {
          res.status(400).json({
            status: "error",
            message: "Failed",
          });
        }

        let doctor = new Doctor({
          name: req.body.name,
          email: req.body.email,
          phn: req.body.phn,
          age: req.body.age,
          gender: req.body.gender,
          password: hashedPassword,
          pic: `/images/${req.files[0].filename.replace(/ /g, "_")}`,
          documents: `/images/${req.files[1].filename.replace(/ /g, "_")}`,
          description: req.body.description,
          speciality: req.body.speciality,
          clinicName: req.body.clinicName,
          clinicAddress: req.body.clinicAddress,
          clinicMap: req.body.clinicMap,
        });

        await doctor.save();
      //   process.env.id = doctor._id;
      //   const resetURL = `${req.protocol}://${req.get(
      //     "host"
      //   )}/auth/verifyDoctor/${doctor._id}`;

      //   const message = `Doctor Details - ${doctor.name} \n Email: ${doctor.email} \n Phone Number: ${doctor.phn} \n Age: ${doctor.age} \n Gender: ${doctor.gender} \n Speciality: ${doctor.speciality} \n clinicName: ${doctor.clinicName} \n clinicAddress: ${doctor.clinicAddress} \n clinicMap: ${doctor.clinicMap}\n Click on the link to verify account: ${resetURL}`;

      //   const attachment = [
      //     {
      //       filename: req.files[0].filename,
      //       path: path.join(__dirname, `../Images/${req.files[0].filename}`),
      //     },
      //     {
      //       filename: req.files[1].filename,
      //       path: path.join(__dirname, `../Images/${req.files[1].filename}`),
      //     },
      //   ];

      //   await sendEmail({
      //     subject: "Verify Documents and get started",
      //     message,
      //     attachment,
      //   });
      });

      return res.status(200).json({
        status: "success",
        message: "Successfully registered Doctor and Email sent to admin",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      message: error,
    });
  }
};

const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Patient.findOne({ email: email }).then(async (patient) => {
    if (patient) {
      bcrypt.compare(password, patient.password, async (err, result) => {
        if (err) {
          res.status(400).json({
            status: "error",
            message: "Some error occured",
          });
        }
        if (result) {
          var token = jwt.sign(
            { id: patient._id, isPatient: true },
            process.env.JWT_SECRET,
            {
              expiresIn: "2d",
            }
          );

          res.status(200).json({
            status: "success",
            message: "Logged In successfully",
            patient: true,
            token,
          });
        } else {
          res.status(400).json({
            status: "error",
            message: "Credentials Not Correct",
          });
        }
      });
    } else {
      const doctor = await Doctor.findOne({ email });
      console.log("doctor", doctor);
      if (!doctor) {
        return res.status(404).json({
          message: "Email Id is Invalid",
        });
      }
      // if (!doctor.validation) {
      //   return res.status(400).json({
      //     message:
      //       "Account is not verified yet please wait for admin to verify your account",
      //   });
      // }
      bcrypt.compare(password, doctor.password, (err, result) => {
        if (err) {
          res.status(400).json({
            status: "error",
            message: "Some error occured",
          });
        }
        if (result) {
          var token = jwt.sign(
            { id: doctor._id, isPatient: false },
            process.env.JWT_SECRET,
            {
              expiresIn: "2h",
            }
          );
        process.env.id = doctor._id;
        console.log("Arjun", process.env.id);
          res.status(200).json({
            status: "success",
            message: "Logged In successfully",
            patient: false,
            token,
          });
        } else {
          res.status(400).json({
            status: "error",
            message: "Credentials Not Correct",
          });
        }
      });
    }
  });
};

const verifyDoctor = async (req, res) => {
  const id = req.params.id;
  const doctor = await Doctor.findById(id);
  if (!doctor) {
    return res.status(404).json({
      message: "Doctor not found",
    });
  }
  if (doctor.validation) {
    return res.status(400).json({
      message: "Doctor already verified",
    });
  }
  doctor.validation = true;
  await doctor.save();
  res.status(200).json({
    message: "Doctor verified successfully",
  });
};

const authPass = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log("Inside If of auth Pass");
    // console.log(req.headers.authorization);
    // console.log(req.headers.authorization.startsWith("Bearer"));

    token = req.headers.authorization.split(" ")[1];
    // console.log(token);
  }

  if (!token || token === null || token == undefined) {
    return res.status(400).json({
      message: "You aren't Logged In",
    });
  }

  try {
    decoded = await jwt.verify(token, process.env.JWT_SECRET)
} catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
        return res.status(200).json({
            status: "fail",
            message: "Session expired"
        })
    }
    return res.status(400).json({
        status: "fail",
        message: "An error occured"
    })
}
  const currentUser = await Patient.findById(decoded.id);

  if (!currentUser) {
    const currentDoctor = await Doctor.findById(decoded.id);
    if (currentDoctor) {
      req.user = currentDoctor;
      res.locals.user = currentDoctor;
      return next();
    } else {
      return res.status(404).json({
        message: "You aren't Logged In",
      });
    }
  }

  // 4) Check if user changed password after the token was issued

  // GRANT ACCESS TO PROTECTED ROUTE

  req.user = currentUser;
  // console.log("This is req.user from middleware", req.user);
  res.locals.user = currentUser;
  console.log("Successfully Passed Middleware");
  next();
};

const profile = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: "success",
    user: user,
  });
};

const editProfile = async (req, res) => {
  const u = req.user;
  const user = await Patient.findById(u._id);
  let userUpdate;
  userUpdate = await Patient.findByIdAndUpdate(user._id, req.body, {
    new: true,
  });
  await user.save();
  res.status(200).json({
    status: "success",
    data: userUpdate,
  });
};

module.exports = {
  patientRegister,
  doctorRegister,
  login,
  verifyDoctor,
  authPass,
  profile,
  editProfile,
};
