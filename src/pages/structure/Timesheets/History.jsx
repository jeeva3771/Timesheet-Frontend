import { ComponentContainerCard, PageBreadcrumb } from '@/components'
import { Col, Row } from 'react-bootstrap'
import { readTimeSheetHistory } from '../Api'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { successAndCatchErrorToastOptions, errorToastOptions } from "../utils/Toastoption.js"
import { capitalizeWords } from '../utils/util.js'
    
const TimeSheetHistory = () => {
  const [historyData, setHistoryData] = useState([])
  useEffect(() =>{
    handleReadTimeSheetHistory()
  }, [])

  const handleReadTimeSheetHistory = async () => {
    try {
      const { response, error } = await readTimeSheetHistory()
      if (error) {
        toast.error(error, errorToastOptions)
        return
      }  
      
      if (response.status === 401) {
        removeUserLogged()
        navigate('/')
        return
      }

      if (response.status === 403) {
          toast.error(await response.json(), errorToastOptions)
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
    <ComponentContainerCard title="Time Sheets History">
      <div className="main-timeline mt-3">
        {historyData.map((data, idx) => {
          return (
            <div key={idx} className="timeline">
              <span className="timeline-icon" />
              <span className="year">{new Date(data.editedDate).getFullYear()}</span>
              <div className="timeline-content">
                <h5 className="title">  
                     {capitalizeWords(
                      data.timesheetUserName 
                        .replace(/\s*\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, '') 
                        .replace(/-\s*$/, '') 
                        .trim() 
                    )} (Date of report submission : {
                      // Check if this history entry includes a date change
                      data.changesWithCreator.includes('Date changed from') 
                        ? (() => {
                            // Extract the new date from the change text
                            const dateChangeMatch = data.changesWithCreator.match(/Date changed from '([^']+)' to '([^']+)'/)
                            return dateChangeMatch ? dateChangeMatch[1] : data.workedDate
                          })()
                        : data.workedDate
                    })
                  </h5>
                <span className="post">{data.editedDate}</span>
                <p className="description">
                  {data.changesWithCreator.split('||').map((line, i, arr) => (
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
      <PageBreadcrumb title="History" subName="Time Sheets List" />
      <Row>
        <Col lg={12}>
          <TimeSheetHistory />
        </Col>
      </Row>
    </>
  )
}
export default History
