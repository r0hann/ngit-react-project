import React from 'react'

interface SubCardProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  marginTop?: string;
  padding?: string;
  innerPadding?: string;
}

const SubCard: React.FC<SubCardProps> = ({width, height, borderRadius, marginTop, padding, innerPadding}) => {
  return (
    <div className="card sub-card" style={{width, height, borderRadius, marginTop, padding }}>
      <div className="card-inner" style={{padding: innerPadding}}></div>
    </div>
  )
}

export default SubCard