import ProfileBoard from './components/ProfileBoard';
import { profiles } from './data/profiles';

function App() {
  // Transform profiles data for the new design
  const avatarUrls = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=84&h=84&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=84&h=84&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=84&h=84&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=84&h=84&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=84&h=84&fit=crop&crop=face"
  ];

  const transformedProfiles = profiles.map((profile, index) => ({
    id: profile.id,
    name: profile.name,
    position: profile.position,
    party: profile.party,
    riskLevel: profile.risk ? `Riesgo ${profile.risk}` : 'Sin delitos cometidos',
    riskColor: profile.risk === 'alto' ? '#E93838' :
               profile.risk === 'medio' ? '#FFA600' :
               profile.risk === 'bajo' ? '#FFD61E' : '#82B310',
    progressWidth: profile.risk === 'alto' ? '100%' :
                   profile.risk === 'medio' ? '75%' :
                   profile.risk === 'bajo' ? '50%' : '25%',
    avatar: avatarUrls[index % avatarUrls.length]
  }));

  return (
    <div className="app">
      <ProfileBoard profiles={transformedProfiles} />
    </div>
  );
}

export default App;
