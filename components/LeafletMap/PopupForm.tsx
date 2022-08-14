import styles from '../../styles/components/popupForm.module.css'

const PopupForm = (ref: any) => {
  return (
    <form 
      className={styles.form}
      // onSubmit={(e) => {
      //   console.log("FORMSUBMIT FUNC TRIGGERD")
      //   e.preventDefault()
      // }
      // }
      >
        <input
          id='popupFormName'
          name='name' 
          placeholder='name...'
          ref={ref}
          className={styles.inputField}
        />
        <textarea 
          id='popupFormDescr'
          name="description" 
          placeholder="description (max 300 characters)"
          maxLength={300}
          className={styles.inputTextarea}
        />
        <input
          id='submitBtn'
          type='submit'
          name='Submit!'
          />
    </form>
  )
}

export default PopupForm