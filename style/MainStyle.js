import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginTop: 10,
  },
  title: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#c00',
  },
  container: {
    flex: 1,
    borderColor: 'gray',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#c2c2c2',
    justifyContent: 'center',
    padding: 10,
  },
  buttonStyle: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'tomato',
    color: 'white',
    flexBasis: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'baseline',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  maskedInput: {
    flexGrow: 1,
    height: 40,
    fontSize: 18,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    alignSelf: 'flex-start',
  },
  containerMask: {
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  errorMessage: {
    alignSelf: 'flex-start',
    marginLeft: 15,
    color: '#f00',
    fontSize: 12,
  },
});

export default styles;
