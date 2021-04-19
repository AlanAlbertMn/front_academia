import React, { useEffect, useRef, useReducer, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";
import BasicButton from "./BasicButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
var _ = require("lodash");

const DocumentRow = ({ file, index, deleteFile, error }) => {
  return (
    <Grid item xs={12} container>
      <Grid item xs={3}>
        <Typography>{file.path}</Typography>
      </Grid>
      <Grid item xs={3} container justify="flex-end">
        <Typography>{parseInt(file.size) / 1000} KB</Typography>
      </Grid>
      <Grid item xs={6} container justify="flex-end">
        <BasicButton color="error" handleClick={() => deleteFile(index)}>
          Eliminar documento
        </BasicButton>
      </Grid>
    </Grid>
  );
};

const ShowDocuments = ({ files, deleteFile, errors }) => {
  return (
    <Grid container>
      <Grid item xs={12} container>
        <Grid item xs={3}>
          <Typography>Archivo</Typography>
        </Grid>
        <Grid item xs={3} container justify="flex-end">
          <Typography>Tamaño</Typography>
        </Grid>
      </Grid>
      {files.map((file, index) => (
        <DocumentRow file={file} index={index} deleteFile={deleteFile} />
      ))}
    </Grid>
  );
};

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#29a19c",
  borderStyle: "dashed",
  backgroundColor: "#222831",
  color: "#29a19c",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    border: "10px solid #FFF",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  item: {
    backgroundColor: "#3B4554",
  },
  table: {
    width: "100%",
    backgroundColor: "#393e46",
    maxHeight: 500,
  },
  tablePaper: {
    backgroundColor: "#393e46",
  },
}));

const BasicDropzone = ({
  mapperKey,
  maxFiles = 5,
  dispatchValue,
  accept = null,
  files,
  setFiles,
  ...rest
}) => {
  const classes = useStyles();

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    errorText,
  } = useDropzone({
    accept,
    maxFiles,
    //getFilesFromEvent: event => myCustomFileGetter(event, setFiles)
  });
  

  const acceptedFilesRef = useRef(acceptedFiles);

  const deleteFile = (indexToDelete) => {
    setFiles((prevFiles) => {
      dispatchValue({
        type: "update",
        key: mapperKey,
        value: prevFiles.filter((file, index) => index !== indexToDelete),
      });

      return prevFiles.filter((file, index) => index !== indexToDelete);
    });
    acceptedFiles.splice(0);
    acceptedFilesRef.current = acceptedFiles;
  };

  useEffect(() => {
    if (!_.isEqual(acceptedFilesRef.current, acceptedFiles)) {
      setFiles((prevState) => {
        if (prevState.length < maxFiles) {
          dispatchValue({
            type: "update",
            value: [...prevState, ...acceptedFiles],
            key: mapperKey,
          });
          return [...prevState, ...acceptedFiles];
        } else {
          return [...prevState];
        }
      });
      acceptedFiles.splice(0);
      acceptedFilesRef.current = acceptedFiles;
    }
  }, [
    acceptedFilesRef,
    acceptedFiles,
    setFiles,
    dispatchValue,
    mapperKey,
    maxFiles,
  ]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  if (accept) {
    return (
      <section className="container">
        {maxFiles === files.length ? (
          <aside>
            <ShowDocuments files={files} deleteFile={deleteFile} />
          </aside>
        ) : (
          <>
            <div className={classes.root} {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <p>Arrastra el archivo o presiona esta área para subirlo</p>
              <em>(Solo se admiten archivos con extensiones {accept})</em>
            </div>
            {errorText && <Typography color="error">{errorText}</Typography>}
          </>
        )}
      </section>
    );
  }

  return null;
};

export default BasicDropzone;
