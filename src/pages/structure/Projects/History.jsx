import { ComponentContainerCard, PageBreadcrumb } from '@/components'
import { Col, Row } from 'react-bootstrap'
import { timelineData2 } from './history'
import { Link } from 'react-router-dom'
import { readProjectHistory } from '../Api'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { successAndCatchErrorToastOptions, errorToastOptions } from "../utils.js/Toastoption.js"
import { capitalizeWords } from '../utils.js/util.js'
    
const ProjectHistory = () => {
  const [historyData, setHistoryData] = useState([])
  useEffect(() =>{
    handleReadProjectHistory()
  }, [])

  const handleReadProjectHistory = async () => {
    try {
      const { response, error } = await readProjectHistory()
      if (error) {
        toast.error(error, successAndCatchErrorToastOptions)
        return
      }  
      
      if (response.status === 401) {
        removeUserLogged()
        navigate('/')
        return
      }

      if (response.ok) {
        const history = await response.json()
        setHistoryData(history)
      } 
    } catch (error) {
      toast.error('Something went wrong. Please try again later.', successAndCatchErrorToastOptions)
    }
  }

  return (
    <ComponentContainerCard title="Projects History">
      <div className="main-timeline mt-3">
        {historyData.map((data, idx) => {
          console.log(data)
          return (
            <div key={idx} className="timeline">
              <span className="timeline-icon" />
              <span className="year">{new Date(data.createdDate).getFullYear()}</span>
              <div className="timeline-content">
                <h5 className="title">  {capitalizeWords(data.projectName.replace(/\s*\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, ''))}
                </h5>
                <span className="post">{data.createdDate}</span>
                <p className="description">
                  {data.changesWithCreator.split(',').map((line, i, arr) => (
                    <React.Fragment key={i}>
                      {line.trim()}
                      {i === arr.length - 1 ? '.' : ''}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </ComponentContainerCard>
  )
}
const History = () => {
  return (
    <>
      <PageBreadcrumb title="History" subName="Projects List" />
      <Row>
        <Col lg={12}>
          <ProjectHistory />
        </Col>
      </Row>
    </>
  )
}
export default History
