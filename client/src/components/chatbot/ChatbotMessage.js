import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const styles = require('./ChatbotMessage.module.scss');

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));


export default function ChatbotMessage({ type, message }) {
  const classes = useStyles();

  return (
    <div className="row mb-2 mx-0">
      {type === "bot" && (
        <div className="col-12 px-0">
          <div
            className="d-inline-block mr-2"
            style={{ verticalAlign: 'top' }}
          >
            <Avatar className={classes.small + ' ' + classes.orange}>
              <i className="fas fa-robot"/>
            </Avatar>
          </div>
          <div className="d-inline-block">
            <div className={styles.chatbotMessage}>{message}</div>
          </div>
        </div>
      )}
      {type === "user" && (
        <div className="col-12 px-0 text-right">
          <div className={styles.userbotMessage + ' d-inline-block'}>{message}</div>
        </div>
      )}
    </div>
  );
};

//max-width: 200px;
//     background: var(--green);
//     border-radius: 10px;
//     padding: 12px;