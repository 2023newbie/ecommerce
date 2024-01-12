import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import classes from './Message.module.css'
import getToken from '../../../util/get-token'
import axios from '../../../util/axios'
import openSocket from 'socket.io-client'
import url from '../../../util/url'

const Message = () => {
  const [isShow, setIsShow] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const containerMess = useRef()
  const userId = useSelector(state => state.login.info.userId)

  const scrollBottom = () => {
    containerMess.current.scrollTop = containerMess.current.scrollHeight
  }

  const sendMessage = async e => {
    const token = getToken()
    const isMessageEmpty = message.trim() === ''
    if (token && !isMessageEmpty) {
      try {
        await axios.post('session', 
          { message, role: 'client' }, 
          { headers: { 'Authorization': 'Bearer ' + token } }
        )
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    const socket = openSocket(url.root)
    socket.on('session', data => {
      if (data.action === 'post' && data.userId === userId) {
        setMessages(data.messages)
      }
      if (data.action === 'remove' && data.userId === userId) {
        setMessages([])
      }
    })
  }, [userId])

  useEffect(() => {
    if (isShow) scrollBottom()
    
  }, [isShow, messages])

  useEffect(() => {
    const token = getToken()
    if (token && isShow) {
      axios.get('session/' + userId, {
        headers: { 'Authorization': 'Bearer ' + token }
      })
        .then(res => {
          if (res.status === 404) {
            return []
          }
          setMessages(res.data.messages)
        })
        .catch(err => console.log(err))
    }
  }, [isShow, userId])

  return (
    <>
      <button
        className={classes.box_help}
        onClick={() => setIsShow(prevState => !prevState)}
      >
        <i className="fa-solid fa-envelope"></i>
      </button>
      {isShow && (
        <div className={classes.box_support}>
          <div>
            <span>Customer Support</span>
            <span>Let's Chat App</span>
          </div>
          <div ref={containerMess}>
            {messages.length > 0 &&
              messages.map(mess => {
                return (
                  <p key={mess._id} className={mess.role === 'client' ? classes.you : classes.admin}>
                    <span><i className="fa-solid fa-circle-user"></i></span>
                    <span>{mess.message}</span>
                  </p>
                )
              })
            }
            {messages.length === 0 && <>
              <p className={classes.admin}>
                <span><i className="fa-solid fa-circle-user"></i></span>
                <span>Xin chào!</span>
              </p>
              <p className={classes.admin}>
                <span><i className="fa-solid fa-circle-user"></i></span>
                <span>Boutique hân hạnh được hỗ trợ bạn.</span>
              </p>
            </>}
          </div>
          <form className={classes.form}>
            <label><i className="fa-solid fa-circle-user"></i></label>
            <input
              type="text"
              placeholder="Enter Message!"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <span><i className="fa-solid fa-paperclip"></i></span>
            <span><i className="fa-solid fa-face-smile"></i></span>
            <button type='button' onClick={sendMessage}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Message
