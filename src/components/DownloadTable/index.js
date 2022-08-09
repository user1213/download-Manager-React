import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faL } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal/lib/components/Modal';

import { downloadConstants } from '../../constants';
import './style.css';

function DownloadTable({download}) {

  const[downloadData, setDownloadData] = useState([]);
  const[showModal, setShowModal] = useState(false);
  const[downloadMsg, setDownloadMsg] = useState([]);
  const[selectAllCheckbox, setSelectAll] = useState(false);
  const[indeterminate, setIndeterminate] = useState(false);
  const[rowCount, setRowCount] = useState('None');

  const getData = () => {
    const initDownload = download.map(x => {
      const {name, device, path, status} = x;
      return{
          name,
          device,
          path,
          status,
          selected: false
      }
    });
    setDownloadData(initDownload);
  };

  useEffect(() => {
    debugger;
    getData();
  }, [])

  const selectAll = (e) => {
    const isChecked = e.target.checked;
    const updatedDownload = downloadData.map(x => {
      const {name, device, path, status} = x;
      return{
          name,
          device,
          path,
          status,
          selected: isChecked
      }
    });
    setDownloadData(updatedDownload);
    setSelectAll(isChecked);
    setRowCount(isChecked ? 'All': 'None');
  }

  const selectRow = idx => {
    const updatedDownload = downloadData.map((x, index) => {
      const {name, device, path, status, selected} = x;
      return{
          name,
          device,
          path,
          status,
          selected: index === idx ? !selected: selected
      }
    });
    setDownloadData(updatedDownload);

    let isAllSelected = true,
        isAllDeselected = true,
        count = 0;
    updatedDownload.forEach(obj => {
        if(obj.selected === false){
            isAllSelected = false;
        }
        else{
            isAllDeselected = false;
            count++;
        }
    })

    setSelectAll(isAllSelected);

    setRowCount(count === 0 ? 'None': count === download.length ? 'All': count);
    (isAllSelected || isAllDeselected) ? setIndeterminate(false): setIndeterminate(true);
  }

  const handleCloseModal = () => {
      setShowModal(false);
  }

  const handleOpenModel = () => {
      setShowModal(true);
  }

  const downloadAll = () => {
    let downloadList = [];
    downloadData.forEach(obj => {
      if(obj.selected){
        downloadList.push(obj)
      }
    });
    setDownloadMsg(downloadList);
    if(downloadList.length){
        handleOpenModel();
    }
  }

  return (
    <div className="App">
      <div className="App-header">
          <div className='controls'>
              <div className='selectAll'>
                <label className='container' data-testid="checkAll">
                        <span className='checkmark'><input type="checkbox" checked={selectAllCheckbox} onChange={selectAll}
                        ref={input => {
                            if(input){
                                input.indeterminate = indeterminate;
                            }
                          }}
                        />
                        </span>
                        Selected {rowCount}
                </label>
              </div>
              <div className='downloadAll'>
                <span className="container" onClick={downloadAll}>
                  <div className='download-icon'><FontAwesomeIcon icon={faDownload}/></div>
                  <label>Download Selected</label>
                </span>
              </div>
          </div>
          <table data-testid="downloadApp">
              <caption>{downloadConstants.CAPTION}</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Device</th>
                <th scope="col">Path</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
                {
                  downloadData.map((obj, idx) => {
                    const {name, device, path, status, selected} = obj;
                    return (
                      <tr key={idx} className={selected ? 'selected': ''}>
                        <td>
                            <label className='container'>
                              <span className='checkmark'><input type="checkbox" checked={selected} onChange={() => selectRow(idx)}/></span>
                              {name}
                            </label>
                        </td>
                        <td>{device}</td>
                        <td>{path}</td>
                        <td>
                          {status === 'available' ? <div><span className='dot'></span>{status}</div>: <span>{status}</span>}
                        </td>
                      </tr>
                    )
                  })
                }
            </tbody>
          </table>
          <Modal
           isOpen={showModal}
           contentLabel="Downloaded Files"
           onRequestClose={handleCloseModal}
          >
           {
               downloadMsg.map((obj, idx) => {
                const{name, device, path, status} = obj;
                if(status === 'available'){
                    return (
                        <p key={idx} className='modalPath_download'>
                            <label className='modal_label'>Name:</label> {name}
                            <label className='modal_label'>Device:</label> {device}
                            <label className='modal_label'>Path:</label> {path}
                            <label className='download_label'>Available for download </label>
                            <FontAwesomeIcon icon={faDownload} size="1x"/>
                        </p>
                    )
                } else {
                    return (
                        <p key={idx} className='modalPath_selected'>
                            <label className='modal_label'>Name:</label> {name}
                            <label className='modal_label'>Device:</label> {device}
                            <label className='modal_label'>Path:</label> {path}
                            <label className='scheduled_label'>Scheduled</label>
                        </p>
                    )
                }
               })
           }
          <button onClick={handleCloseModal}>Close</button>
        </Modal>
      </div>
    </div>
  );
}

export default DownloadTable;
