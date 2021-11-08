import "./ProposalForm.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import axios from 'axios'
import cn from 'classnames';
import Button from 'components/Button/Button'
import TextField from 'components/Form/TextField/TextField'
import TextArea from 'components/Form/TextArea/TextArea'

function ProposalForm() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [sended, setSended] = useState(false);
  const [data, setData] = useState(null);

  const handleSubmit = () => {
    setLoading(true);
    setIsError(false);
    const data = {
      title: title,
      author: author,
      email: email,
      description: description,
    }
    console.log("Sending Post!")
    axios.post('/c4p/', data).then(res => {
      setData(res.data);
      setTitle('');
      setAuthor('');
      setEmail('');
      setDescription('');
      setLoading(false);
      setSended(true);
    }).catch(err => {
      setLoading(false);
      setIsError(true);
    });
  }
  const handleBack = () => {
    setSended(false)
  }

    return (
      <div className={  cn({
          ["ProposalForm"]: true,
        })} >

        {!sended && (
          <>
          <h3>Submit your proposal</h3>
          <div className="Form">
            <div className="FormField">
              <TextField label="Title" name="title" value={title}  changeHandler={e => setTitle(e.target.value)} />
            </div>
            <div className="FormField">
              <TextField label="Author" name="author" value={author} changeHandler={e => setAuthor(e.target.value)} />
            </div>
            <div className="FormField">
              <TextField label="Email" name="email" value={email} changeHandler={e => setEmail(e.target.value)} />
            </div>
            <div className="FormField">
              <TextArea label="Abstract" name="description" value={description} changeHandler={e => setDescription(e.target.value)} />
            </div>
            {isError && <small className="mt-3 d-inline-block text-danger">Something went wrong. Please try again later.</small>}
            <Button main clickHandler={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</Button>



          </div>
          </>
        )}
        {sended && (
          <>
            <h3>Thanks!</h3>
            <Button main clickHandler={handleBack} >Back</Button>
          </>
        )}

      </div>
    );

}
export default ProposalForm;
