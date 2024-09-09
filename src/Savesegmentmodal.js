import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextField, MenuItem, Select,IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const styles={
    saveBtn:{
        color:'black',
        position:'absolute',
        left:'10px',
        top:'25%',
        border:'1px solid #7ec8e3'
    },
    boxModal:{
        
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100vh', 
            width: 400, 
            bgcolor: 'background.paper',  
             display: 'flex',
              flexDirection: 'column',
              boxShadow: 24,  
           
          
    },
    modalHeadingBox:{
        backgroundColor: "#7ec8e3",
        width: '100%',
        p:2 
    },

modalHeading:{
     color: 'white',
     fontSize:'20px' 
},

contentBox:{
    p:2,
    flex: 1,
    overflowY:'auto'
},
schemalink:{
m:1,
    color:'#7ec8e3',
    textDecoration:'underline'
},
blueboxStyle:{
    border:'2px solid #7ec8e3',
    p:2,
    mt:2
},
bottomBtnbox:{
    display: 'flex', 
    justifyContent: 'flex-start',
     mt: 2 
},

savesegbtn:{
     m: 1, 
     backgroundColor: "#64e3a1",
     color:'white' 
},
cancelbtn:{
    m: 1,color:'red'
}

}
const schemaData=[
    {label:'First Name',value:'first_name'},
    {label:'Last Name',value:'last_name'},
    {label:'Gender',value:'gender'},
   {label:'Age',value:'age'},
  {label:'Account Name',value:'account_name'},
  {label:'City',value:'city'},
  {label:'State',value:'state'}
]
const Savesgegmentmodal=()=>{
const [open,setOpen]=useState(false);
const [segmentName,setSegmentName]=useState('');
const [selectedSchema,setSelectedSchema]=useState('');
const [addedSchemas,setAddedschemas]=useState([]);

const handleOpen=()=>{
    setOpen(true);
}
const handleClose=()=>{
    setOpen(false);
}
const handleSchemas=(e)=>{
setSelectedSchema(e.target.value)
}
const fetchAvaiableSchemas=()=>{
    return schemaData.filter(opt=>!addedSchemas.includes(opt.value))
}
const handleAddschema=()=>{
    if(selectedSchema && !addedSchemas.includes(selectedSchema)){
        setAddedschemas([...addedSchemas,selectedSchema]);
        setSelectedSchema('')
    }
}
const handleSavesegment=async()=>{
    setOpen(false);
    const segmentData={
        segment_name:segmentName,
        schema:addedSchemas.map(schema=>{
            const label=schemaData.find(item=> item.value===schema)?.label|| schema;
            return{[schema]:label};
                })
    };
    console.log('data to be sent',segmentData)

    try{
        await new Promise (resolve => setTimeout(resolve,1000));
        console.log('segment save successfully :',segmentData)
    }
    catch(error){
        console.log('error saving segment :',error)
    }
}
return(
    <div>
        <Button variant='outlined' sx={styles.saveBtn} onClick={handleOpen}> Save Segment</Button>
         <Modal open={open} >
            <Box sx={styles.boxModal}
            >
                 <Box display="flex" alignItems="center" sx={styles.modalHeadingBox}>
            <IconButton onClick={handleClose}>
              <ArrowBackIcon sx={{ color: 'white' }} />
            </IconButton>
            <Typography  sx={styles.modalHeading}>
              Saving Segment
            </Typography>
          </Box> 

              <Box sx={styles.contentBox}>

             
                <TextField 
                label='Name of the Segment'
                value={segmentName}
                fullWidth
                onChange={(e)=>setSegmentName(e.target.value)} sx={{m:1}}
                />
                <Select fullWidth value={selectedSchema} onChange={handleSchemas} sx={{m:1}}>
               <MenuItem value=''> Add Schema to segment
               </MenuItem>
               {
        fetchAvaiableSchemas().map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        ))
    }
                </Select>
                <Button variant='text' onClick={handleAddschema} sx={styles.schemalink}>
                    + Add new schema
                </Button>

                  <Box sx={styles.blueboxStyle}>
              {
                addedSchemas.length===0? (
                     <Typography>No schema added</Typography>
                ):(
                    addedSchemas.map((schema,index)=>(
                        <Select
                        fullWidth
                        key={index}
                        value={schema}
                        sx={{m:1}}
                        onChange={(e)=>{
                        const updatedSchemas=[...addedSchemas];
                        updatedSchemas[index]=e.target.value;
                        setAddedschemas(updatedSchemas);
                        }}
                        >
 {
        fetchAvaiableSchemas().map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        ))
    }
                        </Select>
                    ))
                )
              }
                  </Box>
                  </Box>
                  <Box sx={styles.bottomBtnbox}>
                  <Button variant="contained" onClick={handleSavesegment} sx={styles.savesegbtn}>
              Save the Segment
            </Button>
            <Button variant="text" onClick={handleClose} sx={styles.cancelbtn}>
              Cancel
            </Button>
           
          </Box>
               
            </Box>
         </Modal>


    </div>
)

}
export default Savesgegmentmodal;