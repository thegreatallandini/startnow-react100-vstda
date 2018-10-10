import React from 'react';
class App extends React.Component {
//constructor and super passed into props 
  constructor(props) {
    super(props);
//set the initial state of 
    this.state = {
      input: '',                                        
      list: [],
      priority: '',
      editedInput: '',
      editedPriority: ''
    }
    this.addItem        = this.addItem.bind(this);
    this.deleteItem     = this.deleteItem.bind(this);
    this.handlePriority = this.handlePriority.bind(this);
    this.handleEdit     =  this.handleEdit.bind(this);
    this.editingInput   =  this.editingInput.bind(this);}
  addItem() { 
    let newItem = {
      key:       Date.now(),
      input:     this.state.input,
      priority:  this.state.priority,
      isEditing: false      
}
    var existingState = [...this.state.list];
      existingState.push(newItem);
      this.setState({        
        list: existingState,
        input: '',
        priority: ''});
    };
changeUserInput(input) {
  this.setState({
    
    input: input
  });  
}

//deleteItem is a function with key being passed as a parameter
    deleteItem(key) {
//when function is fired , console log ' clicked delete '
    console.log('clicked delete');
//set the state for list to equal the state of the list filtered 
      this.setState({
        list: this.state.list.filter(item => item.key !== key)})};
handleEdit(key, input) {
  let listCopy = [...this.state.list];
  let index= listCopy.findIndex(item => item.key === key);  
 listCopy[index].isEditing = true;
  this.setState({
    list: listCopy,
    editedInput: input,
})}
editingInput(editedInput) {
  this.setState({
    editedInput: editedInput})}


//save function with key being passed in 
save(key) {
  let listCopy2 = [...this.state.list];

  let index= listCopy2.findIndex(item => item.key === key);
  
  listCopy2[index].input = this.state.editedInput;
  listCopy2[index].isEditing = false;
  listCopy2[index].priority = this.state.priority
  this.setState({
    list: listCopy2,})}





  handlePriority(priority) {  
    this.setState({
      priority: priority});}
  render() {
    return (
      <div className='container'><h1 style={{ color: 'white' }}>VSTDA</h1><h4 className='lead' style={{ color: 'white' }}>tOdOs</h4><hr /><div className='row'>
        <div className='col-sm-4'><div className='panel panel-default'><div className='panel-heading'>Todo</div><div className='panel-body'><form className='form'>
 <div className='form-group'><label className='panel-title'>ToDos</label>
    <textarea
             className="create-todo-text"type='text'
                      onChange={(e) => this.changeUserInput(e.target.value)}value={this.state.input} />
                  </div>


                  <div className='form-group'>
                    <label type='text'>Priority</label>
                    <select
                    className='create-todo-priority'
                      type='number'
                      placeholder='Select a Priority'
                      onChange={(e) => this.handlePriority(e.target.value)}
                    >
                      <option value='1'>High</option>
                      <option value='2'>Med</option>
                      <option value='3'>Low</option>
                    </select>
                  </div>
                </form>
              </div>
           <div className='panel-footer'> <button className="create-todo" onClick={(e) => this.addItem()}> Enter</button></div></div></div><div className='col-sm-8'> <div className='panel panel-default'><div className='panel-heading'> todos </div><div><ul>{this.state.list.map((val) => <li className={val.priority === '3' ? 'list-group-item list-group-item-danger' : val.priority === '2' ? 'list-group-item list-group-item-warning' : 'list-group-item list-group-item-success'} > {val.isEditing ? <div><p>Edit your Todo</p><input className='update-todo-text'onChange={(e) => this.editingInput(e.target.value)}value={this.state.editedInput} /><p className='panel-title'>Priority</p><select onChange={(e) => this.handlePriority(e.target.value)}><option value='Select' >Select a priority</option><option value='1'>Low</option> <option value='2'>Med</option> <option value='3'>High</option></select><button id='save'className="update-todo"type='button'onClick={() => this.save(val.key)} >Save</button></div>  :  <div> {val.input}</div> }<a className="glyphicon glyphicon-trash pull-right ml-4 margin delete-todo" onClick={(e) => this.deleteItem(val.key)}></a><a className="glyphicon glyphicon-edit pull-right ml-5 margin edit-todo" onClick={(e) => this.handleEdit(val.key, val.input)}></a></li>)}</ul></div></div></div></div></div> )}}export default App;

