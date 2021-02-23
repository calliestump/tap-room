import React from 'react';
import KegList from './KegList';
import NewKegForm from './NewKegForm';
import KegDetail from './KegDetail';
import EditKegForm from './EditKegForm';



class KegControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterKegList:[],
      selectedKeg: null,
      editing: false
    };
  }

  handleAddingNewKegToList = (newKeg) => {
    const newMasterKegList = this.state.masterKegList.concat(newKeg);
    this.setState({masterKegList: newMasterKegList, formVisibleOnPage: false});
  }

  handleChangingSelectedKeg = (id) => {
    const selectedKeg = this.state.masterKegList.filter(keg => keg.id === id)[0];
    this.setState({selectedKeg: selectedKeg});
  }

  handleDeletingKeg = (id) => {
    const newMasterKegList = this.state.masterKegList.filter(keg => keg.id !== id);
    this.setState({
      masterKegList: newMasterKegList,
      selectedKeg: null
    });
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingKegInList = (kegToEdit) => {
    const editedMasterKegList = this.state.masterKegList
      .filter(keg => keg.id !== this.state.selectedKeg.id)
      .concat(kegToEdit);
    this.setState({
      masterKegList: editedMasterKegList,
      editing: false,
      selectedKeg: null
    });
  }

  handleClick = () => {
    if (this.state.selectedKeg != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedKeg: null
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }
  
  handleBuyingKeg = () => {
    const selectedKeg = this.state.selectedKeg; //selects keg that is currently selected and viewed in details page
    const newKegPintQuantity = Object.assign({}, selectedKeg, {kegPintQuantity: selectedKeg.kegPintQuantity - 1}); //this targets the selectedKeg and it's kegPintQuantity, and assigns it the new kegPintQuantity
    const newKegList = this.state.masterKegList
    .filter(keg => keg.id !== this.state.selectedKeg.id)
    .concat(newKegPintQuantity); //updates the keg list
    this.setState({
      masterKegList: newKegList,
      selectedKeg: newKegPintQuantity
    });
  } 

  handleRestock = (id, amountToRestock) => { // takes in amountToRestock as argument instead of jquery'd
    const newMasterKegList = this.state.masterKegList.map((keg) => ({ // loops through list for specific keg
      ...keg, // uses spread operator to make copy
        kegPintQuantity: keg.id === id ? parseInt(keg.kegPintQuantity) + parseInt(amountToRestock) : keg.kegPintQuantity // uses ternary operator to determine if id's match, if so run kegPintQuantity reassessment. If not, return og value.
    }))
    this.setState({
      masterKegList: newMasterKegList,
      selectedKeg: null
    });
  } 

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing ) {
      currentlyVisibleState = 
      <EditKegForm 
      keg = {this.state.selectedKeg}
      onEditKeg = {this.handleEditingKegInList}
      />
      buttonText = "Return to Keg List"
    } else if (this.state.selectedKeg != null) {
      currentlyVisibleState = 
      <KegDetail 
      keg = {this.state.selectedKeg} 
      onClickingBuy = {this.handleBuyingKeg}
      onClickingDelete = {this.handleDeletingKeg}
      onClickingEdit = {this.handleEditClick}
      onPintRestock = {this.handleRestock}
      />
      buttonText = "Return to Keg List";
    } 
    else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = 
      <NewKegForm
      onNewKegCreation={this.handleAddingNewKegToList} 
      />
      buttonText = "Return to Keg List";
    } else {
      currentlyVisibleState = 
      <KegList 
      kegList={this.state.masterKegList}
      onKegSelection={this.handleChangingSelectedKeg}
      />;
      buttonText = "Add Keg";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <br />
        <button onClick={this.handleClick}>{buttonText}</button> 
      </React.Fragment>
    );
  }
}

export default KegControl;