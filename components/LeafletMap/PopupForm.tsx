import React from 'react'

const PopupForm = () => {
  return (
    <form>
      <input   
        name='name' 
        placeholder='name...'/>
      <input   
        name='description' 
        placeholder='description...'/>
      <input 
        type="submit" 
        value="save"/> 
    </form>
  )
}

export default PopupForm