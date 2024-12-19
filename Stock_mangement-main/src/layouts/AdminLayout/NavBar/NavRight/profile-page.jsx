// import React, { useEffect, useState } from 'react';
// import Image from "../NavRight/image33.png";

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Retrieve user data from localStorage
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     } else {
//       console.log("User not found, redirecting...");
//     }
//   }, []);

//   // Get Role Badge Function
//   const getRoleBadge = (role) => {
//     switch (role) {
//       case 1:
//         return <span style={badgeStyle("#FF6B6B")}>Admin</span>;
//       case 2:
//         return <span style={badgeStyle("#5067AA")}>CMP Techssreact LLP</span>;
//       case 3:
//         return <span style={badgeStyle("#FFB703")}>Supervisor</span>;
//       case 4:
//         return <span style={badgeStyle("#34A853")}>Executive</span>;
//       default:
//         return <span style={badgeStyle("#888")}>Unknown Role</span>;
//     }
//   };

//   const badgeStyle = (bgColor) => ({
//     backgroundColor: bgColor,
//     color: "#fff",
//     padding: "0.3rem 1.8rem",
//     borderRadius: "16px",
//     fontSize: "0.9rem",
//     fontWeight: "600",
//     display: "inline-block",
//     marginLeft:"160px",
//     marginTop: "0.5rem",
//   });

//   const styles = {
//     body: {
//       minHeight: '100vh',
//       width:"100%",
//       marginLeft:"20%",
//       marginRight:"20%",
//       display: 'flex',
//       justifyContent: 'center',
//       flexWrap: 'wrap',
//       alignContent: 'flex-start',
//       fontFamily: "'Roboto', sans-serif",
//       fontSize: '15px',
//       background: "linear-gradient(150deg, #1dcc45 20%, #42b883 100%)",
//       // background:"cornflowerblue",
//       margin: 0,
//       padding: 0,
//       transition: "transform 1s ease-out",
//     // transform: isVisible ? "translateY(0)" : "translateY(-100%)"
//     },
//     header: {
//       padding: '150px 30px',
//       marginBottom: '15px',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//       color: '#333',
//       lineHeight: '1.5',
//       textAlign: 'center',
      
      
//     },
//     main: {
//       display: 'flex',
//       width: '100%',
//       justifyContent: 'center',
//       background: '#fff',
//       marginBottom:"25px",
//       boxShadow: '0 4px 6px rgba(50,50,93,0.11), 0 1px 3px rgba(0,0,0,0.08)',
//       // marginLeft:"-20px"
//       // padding: '20px',
//     },
//     profilePage: {
//       display: 'flex',
//       flexDirection: 'column',
//       width: "100%",
//       marginTop:"-265px"
//       // marginTop:"-330px"
      
//     },
//     content: {
//       display: 'flex',
//       flexDirection: 'column',
//       maxWidth: '500px',
//       width: '100%',
//       // height:"900px",
//       position: 'relative',
//       zIndex: 2,
//       margin: 'auto',
//       padding: '2rem',
//       // background: '#fff',
//       // background: "linear-gradient(150deg, #1dcc45 20%, #42b883 100%)",
//       borderRadius: '2rem',
//       boxShadow: 'rgba(50, 50, 93, 0.1) 0px 15px 35px, rgba(64, 59, 30, 50.07) 0px 5px 15px',
//     },
//     avatar: {
//       width: '10rem',
//       height: '10rem',
//       left: '18%',
//       marginLeft: "31%",
//       backgroundImage: `url(${Image})`,
//       backgroundSize: 'cover',
//       borderRadius: '50%',
//       boxShadow: '0 15px 35px rgba(50,50,93,0.1), 0 5px 15px rgba(0,0,0,0.07)',
//     },
//     title: {
//       textAlign: 'center',
//       marginTop: '1.5rem',
//     },
//     description: {
//       textAlign: 'center',
//       marginTop: '1.5rem',
//     },
//     userInfo: {
//       textAlign: 'center',
//       marginTop: '1rem',
//       fontSize: '1rem',
//       color: '#333',
//       // lineHeight: '1.6',
//     },
//     buttonShowMore: {
//       display: 'inline-block',
//       padding: '1.2rem 1.8rem',
//       textAlign: 'center',
//       textDecoration: 'none',
//       background: 'linear-gradient(100deg, #1d8cf8 30%, #3358f4 100%)',
//       borderRadius: '2rem',
//       boxShadow: '0 4px 6px rgba(50,50,93,0.11), 0 1px 3px rgba(0,0,0,0.08)',
//       fontSize: '1rem',
//       color: '#fff',
//       cursor: 'pointer',
//       marginLeft: '158px',
//       marginBottom:"-6px"
//     },

//     footer: {
//       textAlign: 'center',
//       padding: '12px',
//       fontSize: '9pt',
//       marginTop: '40px',
//       background: '#fff',
//       color: '#333',
//     },
//     span1: {
//       width: "12rem",
//       height: "12rem",
//       top: "42%",
//       right: "28%",
//       background: "rgba(255, 255, 255, 0.1)",
//       animationDuration: "40s",
//       display: "block",
//       borderRadius: "50%",
//       animation: "floating 34s infinite",
//       marginLeft: "200px"
//     },
//     span2: {
//       width: "12rem",
//       height: "12rem",
//       top: "42%",
//       right: "28%",
//       background: "rgba(255, 255, 255, 0.1)",
//       animationDuration: "40s",
//       display: "block",
//       borderRadius: "50%",
//       animation: "floating 34s infinite",
//       marginLeft: "600px",
//       marginTop: "-10px"
//     },
//     span3: {
//       width: "12rem",
//       height: "12rem",
//       top: "42%",
//       right: "28%",
//       marginTop: "-162px",
//       background: "rgba(255, 255, 255, 0.1)",
//       animationDuration: "40s",
//       display: "block",
//       borderRadius: "50%",
//       animation: "floating 34s infinite",
//       marginLeft: "-150px"
//     },
//     span4: {
//       width: "12rem",
//       height: "12rem",
//       top: "42%",
//       right: "28%",
//       marginTop: "-262px",
//       background: "rgba(255, 255, 255, 0.1)",
//       animationDuration: "40s",
//       display: "block",
//       borderRadius: "50%",
//       animation: "floating 34s infinite",
//       marginLeft: "850px"
//     },
   
//   }

//   if (!user) return null;

//   return (
//     <div style={styles.body}>
//       <div>
//         <span style={styles.span1}></span>
//         <span style={styles.span2}></span>
//         <span style={styles.span3}></span>
//         <span style={styles.span4}></span>
//       </div>
//       <header style={styles.header}></header>
//       <main style={styles.main}>
//         <div style={styles.profilePage}>
//           <div style={styles.content}>
//             <div style={styles.avatar}></div>
//             <div>{getRoleBadge(user.role)}</div>
//             <div style={styles.title}>
//               <h4>{user.name}</h4>
//               <span>{user.location || "Location"}</span>
//             </div>
//             <div style={styles.userInfo}>
//               <p>Username: {user.username}</p>
//               <p>Email: {user.email}</p>
//               <p>Password: {user.password}</p> {/* Displaying password */}
//               <p>Phone: {user.phone || "Not Provided"}</p> 
//               {/* <div>{getRoleBadge(user.role)}</div> */}
//             </div>
//             <div style={styles.buttonShowMoreMain}>
//               <a href="/app/dashboard/default" style={styles.buttonShowMore}>
//                 Go Back
//               </a>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ProfilePage;






// import React from 'react';

// const LoginPage = () => {
//   const styles = {
//     body: {
//       background: 'linear-gradient(90deg, #C7C5F4, #776BCC)',
//       fontFamily: 'Raleway, sans-serif',
//       margin: 0,
//       padding: 0,
//     },
//     container: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '100vh',
//     },
//     screen: {
//       background: 'linear-gradient(90deg, #5D54A4, #7C78B8)',
//       position: 'relative',
//       height: '600px',
//       width: '360px',
//       boxShadow: '0px 0px 24px #5C5696',
//     },
//     screenContent: {
//       zIndex: 1,
//       position: 'relative',
//       height: '100%',
//       padding: '30px',
//       paddingTop: '156px',
//     },
//     field: {
//       padding: '20px 0px',
//       position: 'relative',
//     },
//     icon: {
//       position: 'absolute',
//       top: '30px',
//       color: '#7875B5',
//     },
//     input: {
//       border: 'none',
//       borderBottom: '2px solid #D1D1D4',
//       background: 'none',
//       padding: '10px',
//       paddingLeft: '24px',
//       fontWeight: 700,
//       width: '75%',
//       transition: '.2s',
//     },
//     inputFocus: {
//       outline: 'none',
//       borderBottomColor: '#6A679E',
//     },
//     button: {
//       background: '#fff',
//       fontSize: '14px',
//       marginTop: '30px',
//       padding: '16px 20px',
//       borderRadius: '26px',
//       border: '1px solid #D4D3E8',
//       textTransform: 'uppercase',
//       fontWeight: 700,
//       display: 'flex',
//       alignItems: 'center',
//       width: '100%',
//       color: '#4C489D',
//       boxShadow: '0px 2px 2px #5C5696',
//       cursor: 'pointer',
//       transition: '.2s',
//     },
//     buttonHover: {
//       borderColor: '#6A679E',
//       outline: 'none',
//     },
//     socialLogin: {
//       position: 'absolute',
//       height: '140px',
//       width: '160px',
//       textAlign: 'center',
//       bottom: '0px',
//       right: '0px',
//       color: '#fff',
//     },
//     socialIcons: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     socialIcon: {
//       padding: '20px 10px',
//       color: '#fff',
//       textDecoration: 'none',
//       textShadow: '0px 0px 8px #7875B5',
//     },
//     socialIconHover: {
//       transform: 'scale(1.5)',
//     },
//     background: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       zIndex: 0,
//       clipPath: 'inset(0 0 0 0)',
//     },
//     shape: {
//       transform: 'rotate(45deg)',
//       position: 'absolute',
//     },
//     shape1: {
//       height: '520px',
//       width: '520px',
//       background: '#FFF',
//       top: '-50px',
//       right: '120px',
//       borderRadius: '0 72px 0 0',
//     },
//     shape2: {
//       height: '220px',
//       width: '220px',
//       background: '#6C63AC',
//       top: '-172px',
//       right: 0,
//       borderRadius: '32px',
//     },
//     shape3: {
//       height: '540px',
//       width: '190px',
//       background: 'linear-gradient(270deg, #5D54A4, #6A679E)',
//       top: '-24px',
//       right: 0,
//       borderRadius: '32px',
//     },
//     shape4: {
//       height: '400px',
//       width: '200px',
//       background: '#7E7BB9',
//       top: '420px',
//       right: '50px',
//       borderRadius: '60px',
//     },
//   };

//   return (
//     <div style={styles.body }>
//       <div style={styles.container}>
//         <div style={styles.screen}>
//           <div style={styles.background}>
//             <div style={{ ...styles.shape, ...styles.shape1 }}></div>
//             <div style={{ ...styles.shape, ...styles.shape2 }}></div>
//             <div style={{ ...styles.shape, ...styles.shape3 }}></div>
//             <div style={{ ...styles.shape, ...styles.shape4 }}></div>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



import React, { useState, useEffect } from 'react'; 
import Image from "../NavRight/image33.png"; // Assuming you have a placeholder image

const LoginPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      console.log("User not found, redirecting...");
    }
  }, []);

  // Get Role Badge Function
  const getRoleBadge = (role) => {
    switch (role) {
      case 1:
        return <span style={badgeStyle("#FF6B6B")}>Admin</span>;
      case 2:
        return <span style={badgeStyle("#5067AA")}>CMP Techssreact LLP</span>;
      case 3:
        return <span style={badgeStyle("#FFB703")}>Supervisor</span>;
      case 4:
        return <span style={badgeStyle("#34A853")}>Executive</span>;
      default:
        return <span style={badgeStyle("#888")}>Unknown Role</span>;
    }
  };

  // Badge style
  const badgeStyle = (bgColor) => ({
    backgroundColor: bgColor,
    padding: '5px 10px',
    borderRadius: '15px',
    color: '#fff',
  });

  const styles = {
    body: {
      fontFamily: 'Raleway, sans-serif',
      margin: 0,
      padding: 0,
    },
    profilePage: {
      display: 'flex',
      flexDirection: 'column',
      width: "100%",
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '500px',
      width: '100%',
      alignItems:"center",
      position: 'relative',
      zIndex: 2,
      margin: 'auto',
      padding: '2rem',
      borderRadius: '2rem',
      boxShadow: 'rgba(50, 50, 93, 0.1) 0px 15px 35px, rgba(64, 59, 30, 50.07) 13px 44px -1px',
    },
    avatar: {
      width: '10rem',
      height: '10rem',
      backgroundImage: `url(${Image})`,
      backgroundSize: 'cover',
      borderRadius: '50%',
      boxShadow: '0 15px 35px rgba(50,50,93,0.1), 0 5px 15px rgba(0,0,0,0.07)',
    },
    title: {
      textAlign: 'center',
      marginTop: '1.5rem',
    },
    description: {
      textAlign: 'center',
      marginTop: '1.5rem',
    },
    userInfo: {
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: '1rem',
      color: 'black',
    },
    buttonShowMore: {
      display: 'inline-block',
      padding: '1.2rem 1.8rem',
      textAlign: 'center',
      textDecoration: 'none',
      background: 'linear-gradient(100deg, #1d8cf8 30%, #3358f4 100%)',
      borderRadius: '2rem',
      boxShadow: '0 4px 6px rgba(50,50,93,0.11), 0 1px 3px rgba(0,0,0,0.08)',
      fontSize: '1rem',
      color: '#fff',
      cursor: 'pointer',
      marginBottom: "-6px",
      transition: 'all 0.3s ease',  // Smooth transition for hover effect
    },
    buttonShowMoreHover: {
      background: 'red', // Change background on hover
      transform: 'scale(1.05)', // Slightly scale the button on hover
      boxShadow: '0 6px 10px rgba(50,50,93,0.2), 0 2px 6px rgba(0,0,0,0.12)', // Increase shadow on hover
    },
    buttonShowMoreActive: {
      background: 'green', // Change background on active (click)
      transform: 'scale(1.02)', // Slightly scale the button on click
      boxShadow: '0 4px 6px rgba(50,50,93,0.2), 0 2px 6px rgba(0,0,0,0.12)', // Active shadow
    },
    footer: {
      textAlign: 'center',
      padding: '12px',
      fontSize: '9pt',
      marginTop: '40px',
      background: '#fff',
      color: '#333',
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    },
    screen: {
      background: 'linear-gradient(90deg, #5D54A4, #7C78B8)',
      position: 'relative',
      height: '528px',
      marginTop:"-120px",
      width: '360px',
      boxShadow: '0px 0px 24px #5C5696',
    },
    screenContent: {
      zIndex: 1,
      position: 'relative',
      height: '100%',
      padding: '30px',
      paddingTop: '156px',
    },
    field: {
      padding: '20px 0px',
      position: 'relative',
    },
    icon: {
      position: 'absolute',
      top: '30px',
      color: '#7875B5',
    },
    input: {
      border: 'none',
      borderBottom: '2px solid #D1D1D4',
      background: 'none',
      padding: '10px',
      paddingLeft: '24px',
      fontWeight: 700,
      width: '75%',
      transition: '.2s',
    },
    inputFocus: {
      outline: 'none',
      borderBottomColor: '#6A679E',
    },
    button: {
      background: '#fff',
      fontSize: '14px',
      marginTop: '30px',
      padding: '16px 20px',
      borderRadius: '26px',
      border: '1px solid #D4D3E8',
      textTransform: 'uppercase',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      color: '#4C489D',
      boxShadow: '0px 2px 2px #5C5696',
      cursor: 'pointer',
      transition: '.2s',
    },
    buttonHover: {
      borderColor: '#6A679E',
      outline: 'none',
    },
    socialLogin: {
      position: 'absolute',
      height: '140px',
      width: '160px',
      textAlign: 'center',
      bottom: '0px',
      right: '0px',
      color: '#fff',
    },
    socialIcons: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    socialIcon: {
      padding: '20px 10px',
      color: '#fff',
      textDecoration: 'none',
      textShadow: '0px 0px 8px #7875B5',
    },
    socialIconHover: {
      transform: 'scale(1.5)',
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
      clipPath: 'inset(0 0 0 0)',
    },
    shape: {
      transform: 'rotate(45deg)',
      position: 'absolute',
    },
    shape1: {
      height: '520px',
      width: '520px',
      background: '#FFF',
      top: '-50px',
      right: '120px',
      borderRadius: '0 72px 0 0',
    },
    shape2: {
      height: '220px',
      width: '220px',
      background: '#6C63AC',
      top: '-172px',
      right: 0,
      borderRadius: '32px',
    },
    shape3: {
      height: '540px',
      width: '190px',
      background: 'linear-gradient(270deg, #5D54A4, #6A679E)',
      top: '-24px',
      right: 0,
      borderRadius: '32px',
    },
    shape4: {
      height: '400px',
      width: '200px',
      background: '#7E7BB9',
      top: '420px',
      right: '50px',
      borderRadius: '60px',
    },
    buttonShowMore_main: {
      width: "100%",
      textAlign: "center"
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.screen}>
          <div style={styles.background}>
            <div style={{ ...styles.shape, ...styles.shape1 }}></div>
            <div style={{ ...styles.shape, ...styles.shape2 }}></div>
            <div style={{ ...styles.shape, ...styles.shape3 }}></div>
            <div style={{ ...styles.shape, ...styles.shape4 }}></div>
          </div>

          <div style={styles.profilePage}>
            <div style={styles.content}>
              <div style={styles.avatar}></div>
              <div style={styles.buttonShowMore_main}>
                {getRoleBadge(user?.role)}
              </div>
              <div style={styles.title}>
                <h4>{user?.name}</h4>
                <span>{user?.location || "Location"}</span>
              </div>
              <div style={styles.userInfo}>
                <p>Username: {user?.username}</p>
                <p>Email: {user?.email}</p>
                <p>Password: *****</p> {/* Masked password */}
                <p>Phone: {user?.phone || "Not Provided"}</p>
              </div>
              <div >
                <a href="/app/dashboard/default" style={styles.buttonShowMore}>
                  Go Back
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
