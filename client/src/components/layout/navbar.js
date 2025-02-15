import react from 'react'


function navbar() {
    return (
        <div className='sidebar'>
        
            <div className='row'>
                <img
                src={process.env.PUBLIC_URL + "/assets/icons/dashboard.png"}
                className="sidebar__logo"
                />
                Roomy
            </div>
            
            <div className='line'>
                <hr />
            </div>

            <div className='menu'>
            <img
                src={process.env.PUBLIC_URL + "/assets/icons/dashboard.png"}
                className="sidebar__button"
                />
                Roomy
            </div>
        </div>
      
    )
  }
  
  export default navbar