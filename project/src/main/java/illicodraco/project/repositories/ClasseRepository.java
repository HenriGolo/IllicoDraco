package illicodraco.project.repositories;

import illicodraco.project.beans.*;
import java.util.Optional;
import java.util.Collection;

// Interface java gérant le repository des Classes
public interface ClasseRepository extends JpaRepository<Classe,Integer> {

    Classe save(Classe classe);
    
    Optional<Classe> findById(Integer id);
    
    Collection<Classe> findAll();
    
    Long count();

}