package illicodraco.project.repositories;

import illicodraco.project.beans.*;
import java.util.Optional;
import java.util.Collection;

// Interface java gérant le repository de la Boutique
public interface BoutiqueRepository extends JpaRepository<Boutique,Integer> {

    Boutique save(Boutique boutique);
    
    Optional<Boutique> findById(Integer id);
    
    Collection<Boutique> findAll();
    
    Long count();

}