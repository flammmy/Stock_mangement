// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Badge from "react-bootstrap/Badge";
// import backgroundImage from '../NavRight/image2.jpg'
// import { Link } from 'react-router-dom';
// import { color } from "d3";
// import Image from '../NavRight/image22.png'

// function Profile({ user }) {
//   // State to control transition effect
//   const [isVisible, setIsVisible] = useState(false);

//   // Inline CSS styles
//   const profilePageStyle = {
//     height: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#ffffff",
//     fontFamily: "Arial, sans-serif",
//     background: "linear-gradient(45deg, #5067AA, #86A6DE)",
//     // backgroundImage: `url(${backgroundImage})`,
//     transition: "transform 1s ease-out", // Transition for movement
//     transform: isVisible ? "translateY(0)" : "translateY(-100%)", // "Up to Lower" transition
//   };

//   const profileCardStyle = {
//     // background: "linear-gradient(45deg, var(--bs-warning), var(--bs-teal))",
//     background: "linear-gradient(45deg, var(--bs-gray-100), var(--bs-blue))",
//     padding: "2rem",
//     borderRadius: "12px",
//     width: "60%",
//     marginTop:"10%",
//     height:"90%",
//     // transform: "rotate(-3deg)", // Rotates the container by 10 degrees
//     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Optional shadow for a better look
//     margin: "2rem auto",
//   };
  
  
//   const profileHeaderStyle = {
//     width: "100%",
//     textAlign: "center"
//   };

//   const profileImageStyle = {
//     width: "80px",
//     height: "80px",
//     objectFit: "cover",
//   };

//   const profileNameStyle = {
//     fontSize: "1.5rem",
//     fontWeight: "bold",
//     color:"black"
//   };

//   const profileSubtitleStyle = {
//     fontSize: "0.9rem",
//     // color: "#b0b0b0",
//     color:"black"
//   };

//   const searchBarStyle = {
//     marginTop: "1rem",
//     marginBottom: "1rem",
//     color:"black"
//   };

//   const inputStyle = {
//     border: "none",
//     padding: "0.6rem",
//     borderRadius: "8px",
//     backgroundColor: "#333",
//     // color: "#fff",
//     color:"black"
//   };

//   const profileInfoStyle = {
//     // display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "1rem",
//   };

//   const infoItemStyle = {
//     display: "flex",
//     flexDirection: "column",
//     // fontWeight: "bold",
//     fontSize: "0.9rem",
//     color: "#d1d1d1",
//     color:"black"
//     // backgroundColor: isHovered ? "white" : "transparent", // Apply white background on hover
//     // transition: "background-color 0.3s ease",
//   };
 
//   const infoValueStyle = {
//     backgroundColor: "#fff",
//     padding: "0.5rem",
//     borderRadius: "8px",
//     textAlign: "center",
//     color:"black",
  
//   };

//   const buttonStyle = {
//     backgroundColor: "#5e5e5e",
//     color: "#fff",
//     border: "none",
//     padding: "0.6rem 2rem",
//     borderRadius: "8px",
//   };

//   const buttonHoverStyle = {
//     backgroundColor: "#4a4a4a",
//   };

//   // Role badge logic
//   const getRoleBadge = (role) => {
//     switch (role) {
//       case 1:
//         return <Badge bg="success" style={{color:"black"}}>CMP Techssreact LLP</Badge>;
//       case 2:
//         return <Badge bg="primary" style={{color:"black",backgroundColor:"red"}}>Admin</Badge>;
//       case 3:
//         return <Badge bg="warning" text="dark" style={{color:"black"}}>Supervisor</Badge>;
//       case 4:
//         return <Badge bg="info" style={{color:"black"}}>Executive</Badge>;
//       default:
//         return <Badge bg="secondary" style={{color:"black"}}>Unknown Role</Badge>;
//     }
//   };

//   // Set the state to trigger transition after component mounts
//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <div style={profilePageStyle} className="main-div-profile">
//       <div style={profileCardStyle} className="shadow-lg rounded">
//         {/* Profile Header */}
//         <div style={profileHeaderStyle}>
//           <img
//             alt="Profile"
//             style={profileImageStyle}
//             className="rounded-circle"
//             src={Image}
//           />
//           <div>
//             <h3 style={profileNameStyle} className="mb-1">
//               {user.name}
//             </h3>
//             <p style={profileSubtitleStyle} className="mb-0">
//               {user.username}
//             </p>
//             <p style={profileSubtitleStyle}>{user.email}</p>
//           </div>
//         </div>

//         {/* User Info */}
//         <div style={profileInfoStyle}>
//           <div style={infoItemStyle}>
//             <label>Name</label>
//             <div style={infoValueStyle}>{user.name}</div>
//           </div>
//           <div style={infoItemStyle}>
//             <label>Username</label>
//             <div style={infoValueStyle}>{user.username}</div>
//           </div>
//           <div style={infoItemStyle}>
//             <label>Email</label>
//             <div style={infoValueStyle}>{user.email}</div>
//           </div>
//           <div style={infoItemStyle}>
//             <label>Phone</label>
//             <div style={infoValueStyle}>{user.phone}</div>
//           </div>
//           <div style={infoItemStyle}>
//             <label>Role</label>
//             <div style={infoValueStyle}>{getRoleBadge(user.role)}</div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div style={{ textAlign: "center", marginTop: "1rem" }}>
//           <Link to="/dashboard">
//           <button style={buttonStyle} onMouseEnter={(e) => (e.target.style.backgroundColor = "#4a4a4a")} onMouseLeave={(e) => (e.target.style.backgroundColor = "#5e5e5e")}>
//             Go Back
//           </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Example usage
// export default function App() {
//   const userProfile = {
//     name: "Admin",
//     username: "CMP TechsSreact LLP",
//     email: "sholys@example.com",
//     phone: "1234567891",
//     role: 2, // Admin Role
//   };

//   return <Profile user={userProfile} />;
// }


import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import Image from "../NavRight/image22.png";

function Profile({ user }) {
  const [isVisible, setIsVisible] = useState(false);

  // Styles
  const profilePageStyle = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(45deg, #5067AA, #86A6DE)",
    transition: "transform 1s ease-out",
    transform: isVisible ? "translateY(0)" : "translateY(-100%)",
    
    
  };

  const profileCardStyle = {
    background: "linear-gradient(45deg, var(--bs-gray-100), var(--bs-blue))",
    // padding: "2rem",
    borderRadius: "12px",
    width: "60%",
    marginTop: "9%",
    height: "95%",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 1s ease-in-out",
   transition: "backgroundColor 0.3s ease-in-out"

  };
  const profileHeaderStyle = {
    textAlign: "center",
  };

  const profileImageStyle = {
    width: "80px",
    height: "80px",
    objectFit: "cover",
  };

  const profileNameStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "black",
  };

  const profileSubtitleStyle = {
    fontSize: "0.9rem",
    color: "black",
    fontWeight:"600"

  };

  const profileInfoStyle = {
    // display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginTop: "1rem",
  };

  const infoItemStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  };

  const labelStyle = {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "black",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const infoValueStyle = {
    backgroundColor: "#fff",
    padding: "0.5rem",
    borderRadius: "8px",
    textAlign: "center",
    color: "black",
  };

  const buttonStyle = {
    backgroundColor: "red",
    // color: "navy-blue",
    border: "none",
    padding: "0.6rem 2rem",
    borderRadius: "8px",
    transition: "background-color 0.3s ease",
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 1:
        return <Badge bg="success" style={{ color: "black" }}>CMP Techssreact LLP</Badge>;
      case 2:
        return <Badge bg="primary" style={{ color: "black", backgroundColor: "red" }}>Admin</Badge>;
      case 3:
        return <Badge bg="warning" text="dark" style={{ color: "black" }}>Supervisor</Badge>;
      case 4:
        return <Badge bg="info" style={{ color: "black" }}>Executive</Badge>;
      default:
        return <Badge bg="secondary" style={{ color: "black" }}>Unknown Role</Badge>;
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div style={profilePageStyle}>
      <div style={profileCardStyle} className="shadow-lg rounded">
        {/* Profile Header */}
        <div style={profileHeaderStyle}>
          <img
            alt="Profile"
            style={profileImageStyle}
            className="rounded-circle"
            src={Image}
          />
          <div>
            <h3 style={profileNameStyle}>{user.name}</h3>
            <p style={profileSubtitleStyle}>{user.username}</p>
            <p style={profileSubtitleStyle}>{user.email}</p>
          </div>
        </div>

        {/* User Info */}
        <div style={profileInfoStyle}>
          {/* Each Info Item */}
          {["Name", "Username", "Email", "Phone", "Role"].map((item, index) => (
            <div
              key={index}
              style={infoItemStyle}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5067AA")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <label
                style={labelStyle}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                {item}
              </label>
              <div style={infoValueStyle}>
                {item === "Role"
                  ? getRoleBadge(user.role)
                  : user[item.toLowerCase()]}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link to="/app/dashboard/default">
            <button
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "green")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "red")}
            >
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const userProfile = {
    name: "Admin",
    username: "Vishal Sales",
    email: "sholys@example.com",
    phone: "1234567891",
    role: 2,
  };

  return <Profile user={userProfile} />;
}



// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Badge from "react-bootstrap/Badge";
// import { Link, useNavigate } from "react-router-dom";
// import Image from "../NavRight/image22.png";

// function Profile() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     // Fetch user data from localStorage
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     if (storedUser) {
//       setUser(storedUser);
//       setIsVisible(true);
//     } else {
//       // Redirect to login if no user data is found
//       navigate('/');
//     }
//   }, [navigate]);

//   // Styles
//   // const profilePageStyle = {
//   //   height: "100vh",
//   //   display: "flex",
//   //   alignItems: "center",
//   //   justifyContent: "center",
//   //   fontFamily: "Arial, sans-serif",
//   //   background: "linear-gradient(45deg, #5067AA, #86A6DE)",
//   //   transition: "transform 1s ease-out",
//   //   transform: isVisible ? "translateY(0)" : "translateY(-100%)",
//   // };

//   // const profileCardStyle = {
//   //   background: "linear-gradient(45deg, var(--bs-gray-100), var(--bs-blue))",
//   //   borderRadius: "12px",
//   //   width: "60%",
//   //   marginTop: "9%",
//   //   height: "95%",
//   //   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//   //   animation: "fadeIn 1s ease-in-out",
//   //   transition: "backgroundColor 0.3s ease-in-out",
//   // };
//   const profilePageStyle = {
//         height: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontFamily: "Arial, sans-serif",
//         background: "linear-gradient(45deg, #5067AA, #86A6DE)",
//         transition: "transform 1s ease-out",
//         transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        
        
//       };
    
//       const profileCardStyle = {
//         background: "linear-gradient(45deg, var(--bs-gray-100), var(--bs-blue))",
//         // padding: "2rem",
//         borderRadius: "12px",
//         width: "60%",
//         marginTop: "9%",
//         height: "95%",
//         boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//         animation: "fadeIn 1s ease-in-out",
//        transition: "backgroundColor 0.3s ease-in-out"
    
//       };
//   const profileHeaderStyle = {
//     textAlign: "center",
//   };

//   const profileImageStyle = {
//     width: "80px",
//     height: "80px",
//     objectFit: "cover",
//   };

//   const profileNameStyle = {
//     fontSize: "1.5rem",
//     fontWeight: "bold",
//     color: "black",
//   };

//   const profileSubtitleStyle = {
//     fontSize: "0.9rem",
//     color: "black",
//     fontWeight: "600",
//   };

//   const profileInfoStyle = {
//     gridTemplateColumns: "1fr 1fr",
//     gap: "1rem",
//     marginTop: "1rem",
//   };

//   const infoItemStyle = {
//     display: "flex",
//     flexDirection: "column",
//     padding: "0.5rem",
//     borderRadius: "8px",
//     transition: "all 0.3s ease",
//   };

//   const labelStyle = {
//     fontSize: "1rem",
//     fontWeight: "bold",
//     color: "black",
//     transition: "all 0.3s ease",
//     cursor: "pointer",
//   };

//   const infoValueStyle = {
//     backgroundColor: "#fff",
//     padding: "0.5rem",
//     borderRadius: "8px",
//     textAlign: "center",
//     color: "black",
//   };

//   const buttonStyle = {
//     backgroundColor: "red",
//     border: "none",
//     padding: "0.6rem 2rem",
//     borderRadius: "8px",
//     transition: "background-color 0.3s ease",
//   };

//   // Function to get a badge based on the role key
//   const getRoleBadge = (role) => {
//     switch (role) {
//       case 1:
//         return <Badge bg="primary" style={{ color: "black", backgroundColor: "red" }}>Admin</Badge>;
//       case 2:
        
//         return <Badge bg="success" style={{ color: "black" }}>CMP Techssreact LLP</Badge>;
//       case 3:
//         return <Badge bg="warning" text="dark" style={{ color: "black" }}>Supervisor</Badge>;
//       case 4:
//         return <Badge bg="info" style={{ color: "black" }}>Executive</Badge>;
//       default:
//         return <Badge bg="secondary" style={{ color: "black" }}>Unknown Role</Badge>;
//     }
//   };

//   if (!user) return null; // Show nothing if user is not loaded

//   return (
//     <div style={profilePageStyle}>
//       <div style={profileCardStyle} className="shadow-lg rounded">
//         {/* Profile Header */}
//         <div style={profileHeaderStyle}>
//           <img
//             alt="Profile"
//             style={profileImageStyle}
//             className="rounded-circle"
//             src={Image}
//           />
//           <div>
//             <h3 style={profileNameStyle}>{user.name}</h3>
//             <p style={profileSubtitleStyle}>Username: {user.username}</p>
//             <p style={profileSubtitleStyle}>Email: {user.email}</p>
//             <p style={profileSubtitleStyle}>Phone: {user.phone}</p>
//             <p style={profileSubtitleStyle}>Role: {getRoleBadge(user.role)}</p>
//           </div>
//         </div>

//         {/* User Info */}
//         <div style={profileInfoStyle}>
//           {["Name", "Username", "Email", "Phone", "Role"].map((item, index) => (
//             <div
//               key={index}
//               style={infoItemStyle}
//               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5067AA")}
//               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
//             >
//               <label
//                 style={labelStyle}
//                 onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
//                 onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
//               >
//                 {item}
//               </label>
//               <div style={infoValueStyle}>
//                 {item === "Role"
//                   ? getRoleBadge(user.role)
//                   : user[item.toLowerCase()]}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Footer */}
//         <div style={{ textAlign: "center", marginTop: "1rem" }}>
//           <Link to="/app/dashboard/default">
//             <button
//               style={buttonStyle}
//               onMouseEnter={(e) => (e.target.style.backgroundColor = "green")}
//               onMouseLeave={(e) => (e.target.style.backgroundColor = "red")}
//             >
//               Go Back
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;
