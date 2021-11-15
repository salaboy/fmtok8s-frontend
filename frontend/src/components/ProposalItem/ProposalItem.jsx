import "./ProposalItem.scss";
import React from "react";

import Element from '../../components/Element/Element'
import Button from '../../components/Button/Button'
import cn from 'classnames';

function ProposalItem({title, author, id, status, approved, email, description, actionHandler}) {


    const handleAction = (id, status, action) => {

      actionHandler(status, id,action);
    }

    return (
      <Element   >
      <div className={  cn({
          ["ProposalItem"]: true,
          ["--pending"]: status === "PENDING",
          ["--decided"]: status === "DECIDED",
          ["--approved"]: approved,
          ["--rejected"]: approved === false && status === "DECIDED",

        })}>
        <div className="ProposalItem__header">
          <h3>{title}</h3>
          <h5>{author} {email}</h5>
          <div className="ProposalItem__status">
            {status}
          </div>
        </div>
        <div className="ProposalItem__description">
          <p className="p p-s">{description}</p>
        </div>
        <div className="ProposalItem__id">
          {id}
        </div>
        {status && status==="PENDING" && (
          <div className="ProposalItem__actions">
            <div >
              <Button clickHandler={() => handleAction(id, status,"APPROVE")}>Approve</Button>
            </div>
            <div>
              <Button clickHandler={() => handleAction(id, status,"REJECT")}>Reject</Button>
            </div>
          </div>
        )}
        {status && status==="DECIDED" && (
          <div className="ProposalItem__status-info">

              {approved === true  && (
                <div className="ProposalItem__badge --approved">Approved</div>
              )}
              {approved === false  && (
                <div className="ProposalItem__badge --rejected">Rejected</div>
              )}

          </div>
        )}
      </div>
      </Element>
    );

}
export default ProposalItem;
