import React from 'react'
import PhoneService from '../../services/PhoneService'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import IdService from '../../services/IdService'
import moment from 'moment'

class PhoneReviews extends React.Component {

    state = {
        phone: PhoneService.getEmptyPhone(),
        isActive: false,
        isCancel: false,
        isShowOptions: true,
        correctId: null,
    }

    componentDidMount() {
        this.loadPhone()
    }

    loadPhone = () => {
        const { id } = this.props;
        PhoneService.getPhoneById(id)
            .then(({ data }) => this.setState({
                ...this.state,
                phone: data
            }));
    }

    handlerEdit = (id) => {
        this.setState({
            ...this.state,
            isActive: false,
            isCancel: true,
            isShowOptions: false,
            correctId: id
        })
        this.editDescription.contentEditable = true
    }

    handlerCancel = (review) => {
        this.editDescription.contentEditable = false
        this.editDescription.innerText = review.description
        this.setState({
            ...this.state,
            isCancel: false,
            isShowOptions: true
        })
    }

    handlerSave = (review) => {
        const index = this.state.phone.reviews.findIndex(x => x._id === review._id)
        const newPhone = { ...this.state.phone };
        newPhone.reviews[index].description = this.editDescription.textContent;
        this.props.onUpdatedReviewsPhone(newPhone)
        this.setState({
            ...this.state,
            isCancel: false,
            isShowOptions: true
        })
        this.editDescription.contentEditable = false
    }

    displayOptions = (review, user, state) => {
        if (!state.isCancel) return null
        else if (review.email === user.email && review._id === state.correctId) {
            return (
                <div>
                    <button onClick={() => this.handlerCancel(review)}>cancel</button>
                    <button onClick={() => this.handlerSave(review)}>save</button>
                </div>
            )
        }
    }

    coverTimestamp = (time) => {
        return moment(time).fromNow()
    }

    handlerDelete = (review) => {
        const newPhone = { ...this.state.phone };
        newPhone.reviews = newPhone.reviews.filter(currReview => currReview._id !== review._id)
        this.setState({
            ...this.state,
            phone: newPhone
        })
        this.props.onUpdatedReviewsPhone(newPhone)
    }

    handlerToggle = (id) => {
        this.setState({
            ...this.state,
            isActive: !this.state.isActive,
            correctId: id
        })
    }

    handlerPostReview = () => {
        if (!this.props.user.email) return this.props.click()
        const { phone } = { ...this.state };
        phone.reviews.unshift({
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,
            description: this.phoneDescription.value,
            _id: IdService.makeId(),
            createdAt: Date.now()
        })
        this.props.onUpdatedReviewsPhone(phone)
        this.phoneDescription.value = ''
    }

    render() {
        const { phone, correctId, isActive, isShowOptions } = this.state;
        const { user } = this.props
        return (
            <section>
                <div>
                    <h3>What People Thought About This Phone</h3>
                    <h4>Write here the your comment</h4>
                    <div><textarea ref={(description) => { this.phoneDescription = description }} rows="4" cols="50" placeholder="write here..."></textarea></div>
                    <button onClick={this.handlerPostReview}>post</button>
                </div>
                <div className="reviews">
                    {phone.reviews.map(review => (
                        <div key={review._id} className="box flex space-between">
                            <div>{this.coverTimestamp(review.createdAt)} - {review.firstName} {review.lastName}</div>
                            <div className="description">
                                {review.email === user.email && correctId === review._id ?
                                    <ul style={isActive ?
                                        { display: "block" } : { display: "none" }} className="options">
                                        <li><button onClick={() => this.handlerEdit(review._id)}>edit</button></li>
                                        <li><button onClick={() => this.handlerDelete(review)}>delete</button></li>
                                    </ul> : null}
                                {review.email === user.email && correctId === review._id ? <span className="sapn-description"
                                    ref={(edit) => this.editDescription = edit}>{review.description}</span> : <p>{review.description}</p>}
                                <div>{review.email === user.email && isShowOptions ?
                                    <button onClick={() => this.handlerToggle(review._id)}>...</button> : null}</div>
                                <div>{this.displayOptions(review, user, this.state)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )
    }

}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        phones: state.phoneReducer.phones
    }
}

const mapStateToDispatch = dispatch => {
    return {
        onUpdatedReviewsPhone: (phone) => dispatch(actionCreators.updatePhoneReviews(phone)),
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(PhoneReviews)